import dotenv from "dotenv";

dotenv.config();

import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_HOST: z.string().default("db"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    SECRET_KEY: z.string().min(32, "SECRET_KEY must be at least 32 characters"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    FRONTEND_URL: z.string().url().default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);