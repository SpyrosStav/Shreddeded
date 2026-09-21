import { Op } from "sequelize";
import type { MealCreate, MealUpdate } from "./meal.validation.js";
import { Role } from "../../enums/roles.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import Meal from "./Meal.js";
import type { SessionUser } from "../auth/auth.types.js";
import type { MealCriteria } from "./meal.types.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";

export const findById = async (id: string): Promise<Meal> => {

    const meal = await Meal.findByPk(id);

    if (!meal) {
        throw new NotFoundError("Meal not found");
    }

    return meal;
};

export const findByCriteria = async (criteria: MealCriteria, options: QueryOptions, user: SessionUser): Promise<PaginatedResult<Meal>> => {
    const where = user.role === Role.ADMIN
        ? criteria
        : {
            ...criteria,
            [Op.or]: [
                { userId: user.id },
                { userId: null }
            ]
        };

    const { rows, count } = await Meal.findAndCountAll({
        where,
        order: options.order || [["meal_date", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });

    return { rows, count };
};

export const create = async (mealData: MealCreate & { userId: string }): Promise<Meal> => {
    return await Meal.create(mealData);
};

export const update = async (meal: Meal, data: MealUpdate): Promise<Meal> => {
    return meal.update(data);
};

export const remove = async (meal: Meal) => {
    await meal.destroy();
};