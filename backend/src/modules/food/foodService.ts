import type { FoodCreate, FoodUpdate } from "./food.validation.js";
import { Role } from "../../enums/roles.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import * as foodRepository from "./foodRepository.js";
import type { SessionUser } from "../auth/auth.types.js";
import type { FoodAttributes, FoodCriteria } from "./food.types.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";

export const findById = async (id: string): Promise<FoodAttributes> => {
    return foodRepository.findById(id);
}

export const findByCriteria = async (criteria: FoodCriteria, options: QueryOptions, user: SessionUser): Promise<PaginatedResult<FoodAttributes>> => {
    return foodRepository.findByCriteria(criteria, options, user);
};

export const create = async (data: FoodCreate, user: SessionUser): Promise<FoodAttributes> => {
    return foodRepository.create({
        ...data,
        userId: user.id
    });
};

export const update = async (id: string, data: FoodUpdate, user: SessionUser): Promise<FoodAttributes> => {
    const food = await foodRepository.findById(id);

    if (
        food.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    return foodRepository.update(food, data);
};

export const remove = async (id: string, user: SessionUser) => {

    const food = await foodRepository.findById(id);

    if (
        food.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    await foodRepository.remove(food);
    return true;
};
