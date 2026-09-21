import type { MealQuery } from "./meal.validation.js";

export type MealCriteria = Pick<MealQuery, "userId" | "mealType">;

export type MealAttributes = {
    id: string;
    mealDate: Date | null;
    mealType: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};