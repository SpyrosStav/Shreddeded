import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Sex } from "../../enums/sexes.js";
import { Role } from "../../enums/roles.js";

extendZodWithOpenApi(z);

//Request Schemas
export const userParamsSchema = z.object({
    id: z.string().describe("User id")
});

export const createUserRequestSchema = z.object({
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
    dateOfBirth: z.iso.date().optional(),
    sex: z.enum(Sex).optional(),
    height: z.int().optional()
});

export const updateUserRequestSchema = createUserRequestSchema.partial().omit({ password: true });

export const userQuerySchema = z.object({
    id: z.uuid().optional().describe("Filter by user id"),
    username: z.string().optional().describe("Filter by username"),
    email: z.string().optional().describe("Filter by email"),
    limit: z.coerce.number().int().positive().max(100).optional().describe("Maximum results"),
    offset: z.coerce.number().int().nonnegative().optional().describe("Results to skip"),
    sortBy: z.enum(["username", "email", "firstName", "lastName"]).optional(),
    sortDirection: z.enum(["ASC", "DESC"]).optional(),
});

//Response Schemas
export const userResponseSchema = z.object({
    id: z.string(),
    email: z.email(),
    username: z.string(),
    role: z.enum(Role),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    dateOfBirth: z.date().nullable(),
    sex: z.enum(Sex).nullable(),
    height: z.number().nullable(),
});

//Inferred types
export type UserParams = z.infer<typeof userParamsSchema>;
export type UserCreate = z.infer<typeof createUserRequestSchema>;
export type UserUpdate = z.infer<typeof updateUserRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;