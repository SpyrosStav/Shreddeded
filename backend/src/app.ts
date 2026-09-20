import pgSession from "connect-pg-simple";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import pg from "pg";
import swaggerUi from "swagger-ui-express";
import sequelize from "./config/db.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { requestId } from "./middleware/requestId.js";
import routes from "./routes.js";
import { swaggerSpec } from "./swagger.js";

const app = express();
const PORT = env.PORT || 3000;
const pgPool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 });

app.set("trust proxy", 1);

app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true
}));

app.use(helmet());
app.use(globalLimiter);

// Middleware
app.use(express.json());

app.use(
    session({
        store: new (pgSession(session))({ pool: pgPool }),
        secret: process.env.SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        },
    })
);

app.use(requestId);
app.use(logger);

// Routes
app.use(routes);

// Swagger
const swaggerOptions = {
    operationsSorter: (a: any, b: any) => {
        const aOrder = a.get("operation").get("x-order") || Number.MAX_SAFE_INTEGER;
        const bOrder = b.get("operation").get("x-order") || Number.MAX_SAFE_INTEGER;

        return aOrder - bOrder;
    },
};
if (env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions }));
}

// Endpoints
app.get("/", (req, res) => {
    res.send("API running");
});
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Processes
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    await sequelize.close();
    await pgPool.end();
    process.exit(0);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // don't keep running in an unknown state
});

// Start Server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("DB Error:", err);
        process.exit(1);
    }
};

startServer();

export default app;