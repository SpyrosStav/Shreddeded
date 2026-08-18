import type { NextFunction, Request, Response } from "express";
import type { UserCreate, UserParams, UserQuery, UserUpdate } from "../dtos/user/user.validation.js";
import * as userService from "../services/userService.js";
import type { UserCriteria } from "../types/user.types.js";
import type { QueryOptions } from "../types/shared.types.js";

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as UserParams;

        const user = await userService.findById(params.id);

        res.json(user.toPublic());

    } catch (err) {
        next(err);
    }
}

export const findByCriteria = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.validated?.query as UserQuery;

        const criteria: UserCriteria = {
            ...(query.userId && { userId: query.userId }),
            ...(query.username && { name: query.username }),
            ...(query.email && { name: query.username }),
        };

        const options: QueryOptions = {
            limit: query.limit,
            offset: query.offset,
            order: query.sortBy
                ? [[query.sortBy, query.sortDirection || "ASC"]]
                : undefined,
        };

        const users = await userService.findByCriteria(criteria, options);

        res.json(users);

    } catch (err) {
        next(err);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.validated?.body as UserCreate;

        const user = await userService.add(body);

        res.status(201).json(user.toPublic());

    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as UserParams;
        const body = req.validated?.body as UserUpdate;

        const user = await userService.update(params.id, body);

        res.json(user.toPublic());

    } catch (err) {
        next(err);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated?.params as UserParams;

        await userService.remove(params.id);

        res.status(204).send();

    } catch (err) {
        next(err);
    }
}