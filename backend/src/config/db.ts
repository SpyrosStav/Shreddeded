import { Sequelize } from "sequelize";
import { env } from "./env.js";

const sequelize = new Sequelize(
    env.POSTGRES_DB,
    env.POSTGRES_USER,
    env.POSTGRES_PASSWORD,
    {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;