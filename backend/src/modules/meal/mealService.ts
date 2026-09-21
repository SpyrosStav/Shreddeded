import type { MealCreate, MealUpdate } from "./meal.validation.js";
import { Role } from "../../enums/roles.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import * as mealRepository from "./mealRepository.js";
import type { SessionUser } from "../auth/auth.types.js";
import type { MealAttributes, MealCriteria } from "./meal.types.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";

export const findById = async (id: string): Promise<MealAttributes> => {
    return mealRepository.findById(id);
}

export const findByCriteria = async (criteria: MealCriteria, options: QueryOptions, user: SessionUser): Promise<PaginatedResult<MealAttributes>> => {
    return mealRepository.findByCriteria(criteria, options, user);
};

export const create = async (data: MealCreate, user: SessionUser): Promise<MealAttributes> => {
    return mealRepository.create({
        ...data,
        userId: user.id
    });
};

export const update = async (id: string, data: MealUpdate, user: SessionUser): Promise<MealAttributes> => {
    const meal = await mealRepository.findById(id);

    if (
        meal.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    return mealRepository.update(meal, data);
};

export const remove = async (id: string, user: SessionUser) => {

    const meal = await mealRepository.findById(id);

    if (
        meal.userId !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }

    await mealRepository.remove(meal);
    return true;
};