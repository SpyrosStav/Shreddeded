import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const loginRequestSchema = z.object({
    emailOrUsername: z.string()
        .trim()
        .min(1, "Email or username is required"),

    password: z.string()
        .min(1, "Password is required")
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;