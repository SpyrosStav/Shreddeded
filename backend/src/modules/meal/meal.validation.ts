import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

//todo meals must be created with items
export const mealParamsSchema = z.object({
    id: z.string().describe("Meal id"),
});

export const mealSchema = z.object({
    id: z.string(),
    mealDate: z.coerce.date().nullable(),
    mealType: z.string().nullable(),
    userId: z.string(),
});

export const mealCreateSchema = mealSchema.omit({ id: true, userId: true })
    .partial({
        mealDate: true,
        mealType: true
    });

export const mealUpdateSchema = mealCreateSchema.partial();

//todo filter by id list
//todo filter by date range
export const mealQuerySchema = z.object({
    mealType: z.string().optional().describe("Filter by meal type"),
    userId: z.uuid().optional().describe("Filter by user id"),
    limit: z.coerce.number().int().positive().max(100).optional().describe("Maximum results"),
    offset: z.coerce.number().int().nonnegative().optional().describe("Results to skip"),
    sortBy: z.enum([]).optional(),
    sortDirection: z.enum(["ASC", "DESC"]).optional(),
});

export type MealParams = z.infer<typeof mealParamsSchema>;
export type MealCreate = z.infer<typeof mealCreateSchema>;
export type MealUpdate = z.infer<typeof mealUpdateSchema>;
export type MealQuery = z.infer<typeof mealQuerySchema>;
export type MealResponse = z.infer<typeof mealSchema>;