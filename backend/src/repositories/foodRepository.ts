import Food from "../models/Food.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js";
import type { CreateFoodBody, UpdateFoodBody } from "../dtos/food.validation.js";

export const findById = async (id: string) => {
    const food = await Food.findByPk(id);

    if (!food) {
        throw new NotFoundError("Food not found");
    }

    return food;
};

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions) => {
    return await Food.findAll({
        where: criteria,
        order: options.order || [["name", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });
};

export const exists = async (id: string) => !!await Food.findByPk(id, { attributes: ['id'] });

export const create = async (foodData: CreateFoodBody) => {
    return await Food.create(foodData);
}; `1`

export const update = async (id: string, data: UpdateFoodBody) => {
    const food = await findById(id);
    return food.update(data);
};

export const remove = async (id: string) => {
    const food = await findById(id);
    await food.destroy();
};