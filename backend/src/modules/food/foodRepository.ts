import { Op } from "sequelize";
import type { FoodCreate, FoodUpdate } from "./food.validation.js";
import { Role } from "../../enums/roles.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import Food from "./Food.js";
import type { SessionUser } from "../auth/auth.types.js";
import type { FoodCriteria } from "./food.types.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";

export const findById = async (id: string): Promise<Food> => {

    const food = await Food.findByPk(id);

    if (!food) {
        throw new NotFoundError("Food not found");
    }

    return food;
};

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions, user: SessionUser): Promise<PaginatedResult<Food>> => {
    const where = user.role === Role.ADMIN
        ? criteria
        : {
            ...criteria,
            [Op.or]: [
                { userId: user.id },
                { userId: null }
            ]
        };

    const { rows, count } = await Food.findAndCountAll({
        where,
        order: options.order || [["name", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });

    return { rows, count };
};

export const create = async (foodData: FoodCreate & { userId: string }): Promise<Food> => {
    return await Food.create(foodData);
};

export const update = async (food: Food, data: FoodUpdate): Promise<Food> => {
    return food.update(data);
};

export const remove = async (food: Food) => {
    await food.destroy();
};