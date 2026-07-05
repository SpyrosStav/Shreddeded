import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const foodIdParamsSchema = z.object({
    id: z.string().describe("Food id"),
})

export const createFoodBodySchema = z.object({
    name: z.string().min(1).max(100).describe("Food name"),
    calories: z.coerce.number().int().nonnegative().optional().describe("Calories"),
    protein: z.coerce.number().nonnegative().optional().describe("Protein in grams"),
    carbs: z.coerce.number().nonnegative().optional().describe("Carbohydrates in grams"),
    fat: z.coerce.number().nonnegative().optional().describe("Fat in grams"),
    fiber: z.coerce.number().nonnegative().optional().describe("Fiber in grams"),
    userId: z.string().optional().describe("Owner user id"),
}).strict();

export const updateFoodBodySchema = createFoodBodySchema.partial();

export const foodResponseSchema = createFoodBodySchema.extend({
    id: z.string().describe("Food id"),
});

export const foodQuerySchema = z.object({
    userId: z.string().uuid().optional().describe("Filter by user id"),
    name: z.string().optional().describe("Filter by food name"),
    limit: z.coerce.number().int().positive().max(100).optional().describe("Maximum results"),
    offset: z.coerce.number().int().nonnegative().optional().describe("Results to skip"),
    sortBy: z.enum(["name", "calories", "protein", "carbs", "fat", "fiber"]).optional(),
    sortDirection: z.enum(["ASC", "DESC"]).optional(),
});
