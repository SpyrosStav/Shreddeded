import type { Request, Response, NextFunction } from "express";
import * as foodService from "../services/foodService.js";
import type { FoodParams, FoodQuery, FoodCreate, FoodUpdate } from "../dtos/food/food.validation.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js"

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated?.params as FoodParams;
        const food = await foodService.findById(params.id);

        res.json(food);

    } catch (err) {
        next(err);
    }
};

export const findByCriteria = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.validated?.query as FoodQuery;

        const criteria: FoodCriteria = {
            ...(query.userId && { userId: query.userId }),
            ...(query.name && { name: query.name }),
        };

        const options: QueryOptions = {
            limit: query.limit,
            offset: query.offset,
            order: query.sortBy
                ? [[query.sortBy, query.sortDirection || "ASC"]]
                : undefined,
        };

        const foods = await foodService.findByCriteria(criteria, options);

        res.json(foods);

    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const body = req.validated?.body as FoodCreate;
        const user = req.context.user!;

        const food = await foodService.create(body, user);

        res.status(201).json(food);

    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as FoodParams;
        const body = req.validated?.body as FoodUpdate;
        const user = req.context.user!;

        const food = await foodService.update(params.id, body, user);

        res.json(food);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const params = req.validated?.params as FoodParams;
        const user = req.context.user!;

        await foodService.remove(params.id, user);

        res.status(204).send();

    } catch (err) {
        next(err);
    }
};