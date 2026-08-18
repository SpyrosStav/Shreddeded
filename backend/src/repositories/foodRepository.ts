import Food from "../models/Food.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js";
import type { FoodCreate, FoodUpdate } from "../dtos/food/food.validation.js";
import type { SessionUser } from "../types/auth.types.js";
import { Role } from "../enums/roles.js";
import { Op } from "sequelize";

export const findById = async (id: string) => {

    const food = await Food.findByPk(id);

    if (!food) {
        throw new NotFoundError("Food not found");
    }

    return food;
};

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions, user: SessionUser) => {
    const where = {
        ...criteria,
        ...(user.role !== Role.ADMIN && {
            [Op.or]: [
                { userId: user.id },
                { userId: null }
            ]
        })
    };

    return await Food.findAll({
        where,
        order: options.order || [["name", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });
};

export const create = async (foodData: FoodCreate) => {
    return await Food.create(foodData);
};

export const update = async (id: string, data: FoodUpdate) => {
    const food = await findById(id);
    return food.update(data);
};

export const remove = async (id: string) => {
    const food = await findById(id);
    await food.destroy();
};

export const exists = async (id: string) => !!await Food.findByPk(id, { attributes: ['id'] });