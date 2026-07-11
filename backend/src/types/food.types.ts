import type { FoodQuery } from "../dtos/food.validation.js";

export type FoodCriteria = Pick<FoodQuery, "userId" | "name">;