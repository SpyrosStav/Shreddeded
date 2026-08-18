import type { FoodCreate, FoodUpdate } from "../dtos/food/food.validation.js";
import { Role } from "../enums/roles.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";
import * as foodRepository from "../repositories/foodRepository.js";
import type { SessionUser } from "../types/auth.types.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js";

export const findById = async (id: string) => {
    return foodRepository.findById(id);
}

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions, user: SessionUser) => {
    return foodRepository.findByCriteria(criteria, options, user);
};

export const create = async (data: FoodCreate, user: SessionUser) => {
    return foodRepository.create({
        ...data
    });
};

export const update = async (id: string, data: FoodUpdate, user: SessionUser) => {
    const food = await foodRepository.findById(id);

    if (
        food.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    return foodRepository.update(id, data);
};

export const remove = async (id: string, user: SessionUser) => {

    const food = await foodRepository.findById(id);

    if (
        food.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    await foodRepository.remove(id);
    return true;
};
