import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { env } from "./env.js";

dotenv.config();

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST || "db",
        port: env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;