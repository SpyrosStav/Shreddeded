import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Sex } from "../../enums/sexes.js";

extendZodWithOpenApi(z);

export const userParamsSchema = z.object({
    id: z.string().describe("User id"),
});

export const userCreateSchema = z.object({
    email: z.email("Invalid email address"),

    username: z.string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username cannot exceed 50 characters"),

    password: z.string()
        .trim()
        .min(8, "Password must be at least 8 characters"),

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z.date().optional(),
    sex: z.enum(Sex).optional(),
    height: z.number().int().optional()
});

export const userUpdateSchema = userCreateSchema.partial();

export const registrationSchema = userCreateSchema.omit({
    password: true,
});

export type UserParams = z.infer<typeof userParamsSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserResponse = z.infer<typeof registrationSchema>;