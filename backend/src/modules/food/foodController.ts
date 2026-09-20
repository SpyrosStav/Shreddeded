import type { NextFunction, Request, Response } from "express";
import type { FoodCreate, FoodParams, FoodQuery, FoodUpdate } from "./food.validation.js";
import { Role } from "../../enums/roles.js";
import * as foodService from "./foodService.js";
import type { FoodCriteria } from "./food.types.js";
import type { QueryOptions } from "../../types/shared.types.js";
import { toPaginatedResponse } from "../../utils/paginate.js";
import { compact } from "../../utils/compact.js";

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated!.params as FoodParams;
        const food = await foodService.findById(params.id);

        res.json(food);

    } catch (err) {
        next(err);
    }
};

export const findByCriteria = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.validated!.query as FoodQuery;
        const user = req.context.user!;

        const criteria = compact<FoodCriteria>({
            userId: user.role === Role.ADMIN ? query.userId : undefined,
            name: query.name,
        });

        const options: QueryOptions = {
            limit: query.limit,
            offset: query.offset,
            order: query.sortBy
                ? [[query.sortBy, query.sortDirection || "ASC"]]
                : undefined,
        };

        const result = await foodService.findByCriteria(criteria, options, user);

        res.json(toPaginatedResponse(result, options));

    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const body = req.validated!.body as FoodCreate;
        const user = req.context.user!;

        const food = await foodService.create(body, user);

        res.status(201).json(food);

    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated!.params as FoodParams;
        const body = req.validated!.body as FoodUpdate;
        const user = req.context.user!;

        const food = await foodService.update(params.id, body, user);

        res.json(food);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated!.params as FoodParams;
        const user = req.context.user!;

        await foodService.remove(params.id, user);

        res.status(204).send();

    } catch (err) {
        next(err);
    }
};
