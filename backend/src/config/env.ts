import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().default("db"),
    DB_PORT: z.coerce.number().default(5432),
});

export const env = envSchema.parse(process.env);