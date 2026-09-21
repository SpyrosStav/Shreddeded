import type { NextFunction, Request, Response } from "express";
import type { MealCreate, MealParams, MealQuery, MealUpdate } from "./meal.validation.js";
import { Role } from "../../enums/roles.js";
import * as mealService from "./mealService.js";
import type { MealCriteria } from "./meal.types.js";
import type { QueryOptions } from "../../types/shared.types.js";
import { toPaginatedResponse } from "../../utils/paginate.js";
import { compact } from "../../utils/compact.js";

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated!.params as MealParams;
        const meal = await mealService.findById(params.id);

        res.json(meal);

    } catch (err) {
        next(err);
    }
};

export const findByCriteria = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.validated!.query as MealQuery;
        const user = req.context.user!;

        const criteria = compact<MealCriteria>({
            userId: user.role === Role.ADMIN ? query.userId : undefined,
            mealType: query.mealType,
        });

        const options: QueryOptions = {
            limit: query.limit,
            offset: query.offset,
            order: query.sortBy
                ? [[query.sortBy, query.sortDirection || "ASC"]]
                : undefined,
        };

        const result = await mealService.findByCriteria(criteria, options, user);

        res.json(toPaginatedResponse(result, options));

    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const body = req.validated!.body as MealCreate;
        const user = req.context.user!;

        const meal = await mealService.create(body, user);

        res.status(201).json(meal);

    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated!.params as MealParams;
        const body = req.validated!.body as MealUpdate;
        const user = req.context.user!;

        const meal = await mealService.update(params.id, body, user);

        res.json(meal);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated!.params as MealParams;
        const user = req.context.user!;

        await mealService.remove(params.id, user);

        res.status(204).send();

    } catch (err) {
        next(err);
    }
};
