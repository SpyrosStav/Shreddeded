import type { FoodQuery } from "../dtos/food/food.validation.js";

export type FoodCriteria = Pick<FoodQuery, "userId" | "name">;