import express from "express";
import session from "express-session";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import sequelize from "./config/db.js";

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("API running");
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB Connected & Models Synced!");
    } catch (err) {
        console.error("DB Error:", err);
    }
})();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;