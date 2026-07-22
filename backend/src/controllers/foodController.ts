import type { Request, Response, NextFunction } from "express";
import * as foodService from "../services/foodService.js";
import type { FoodIdParams, FoodQuery, CreateFoodBody, UpdateFoodBody } from "../dtos/food/food.validation.js";
import type { FoodCriteria } from "../types/food.types.js";
import type { QueryOptions } from "../types/shared.types.js"

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as FoodIdParams;

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

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.validated?.body as CreateFoodBody;

        const food = await foodService.create(body);

        res.status(201).json(food);
    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as FoodIdParams;
        const body = req.validated?.body as UpdateFoodBody;

        const food = await foodService.update(params.id, body);

        res.json(food);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as FoodIdParams;

        await foodService.remove(params.id);

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};