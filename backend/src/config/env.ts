import dotenv from "dotenv";

dotenv.config();

import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().default("db"),
    DB_PORT: z.coerce.number().default(5432),
    SECRET_KEY: z.string().min(32, "SECRET_KEY must be at least 32 characters"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    FRONTEND_URL: z.string().url().default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);