import type { FoodQuery } from "./food.validation.js";

export type FoodCriteria = Pick<FoodQuery, "userId" | "name">;

export type FoodAttributes = {
    id: string;
    name: string;
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    fiber: number | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
};