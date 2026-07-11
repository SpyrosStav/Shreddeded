import type { CreateFoodBody, UpdateFoodBody } from "../dtos/food.validation.js";
import * as foodRepository from "../repositories/foodRepository.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js";

export const findById = async (id: string) => {
    return foodRepository.findById(id);
}

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions) => {
    return foodRepository.findByCriteria(criteria, options);
};

export const create = async (data: CreateFoodBody) => {
    return foodRepository.create(data);
};

export const update = async (id: string, data: UpdateFoodBody) => {
    return foodRepository.update(id, data);
};

export const remove = async (id: string) => {
    await foodRepository.remove(id);

    return true;
};
