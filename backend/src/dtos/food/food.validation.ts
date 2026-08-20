import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Role } from "../../enums/roles.js";

extendZodWithOpenApi(z);

export const foodParamsSchema = z.object({
    id: z.string().describe("Food id"),
});

export const foodSchema = z.object({
    id: z.string(),
    name: z.string(),
    calories: z.coerce.number().int().nullable(),
    protein: z.coerce.number().nullable(),
    carbs: z.coerce.number().nullable(),
    fat: z.coerce.number().nullable(),
    fiber: z.coerce.number().nullable(),
    userId: z.string().nullable(),
});

export const foodCreateSchema = foodSchema.omit({ id: true, userId: true })
    .partial({
        calories: true,
        protein: true,
        carbs: true,
        fat: true,
        fiber: true
    });

export const foodUpdateSchema = foodCreateSchema.partial();

export const foodQuerySchema = z.object({
    userId: z.uuid().optional().describe("Filter by user id"),
    name: z.string().optional().describe("Filter by food name"),
    limit: z.coerce.number().int().positive().max(100).optional().describe("Maximum results"),
    offset: z.coerce.number().int().nonnegative().optional().describe("Results to skip"),
    sortBy: z.enum(["name", "calories", "protein", "carbs", "fat", "fiber"]).optional(),
    sortDirection: z.enum(["ASC", "DESC"]).optional(),
});

export type FoodParams = z.infer<typeof foodParamsSchema>;
export type FoodCreate = z.infer<typeof foodCreateSchema>;
export type FoodUpdate = z.infer<typeof foodUpdateSchema>;
export type FoodQuery = z.infer<typeof foodQuerySchema>;
export type FoodResponse = z.infer<typeof foodSchema>;