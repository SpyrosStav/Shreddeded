import express from "express";
import session from "express-session";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import sequelize from "./config/db.js";
import routes from "./routes/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600 * 1000 },
    })
);

// Routes
app.use(routes);

// Swagger
const swaggerOptions = {
    operationsSorter: (a, b) => {
        const aOrder = a.get("operation").get("x-order") || Number.MAX_SAFE_INTEGER;
        const bOrder = b.get("operation").get("x-order") || Number.MAX_SAFE_INTEGER;

        return aOrder - bOrder;
    },
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions }));

app.get("/", (req, res) => {
    res.send("API running");
});

// Error Handler
app.use(errorHandler);

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
