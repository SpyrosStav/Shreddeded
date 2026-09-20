import type { NextFunction, Request, Response } from "express";
import type { QueryOptions } from "../../types/shared.types.js";
import { toPaginatedResponse } from "../../utils/paginate.js";
import type { UserCriteria } from "./user.types.js";
import type { UserCreate, UserParams, UserQuery, UserUpdate } from "./user.validation.js";
import * as userService from "./userService.js";
import { compact } from "../../utils/compact.js";

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated!.params as UserParams;

        const user = await userService.findById(params.id);

        res.json(user);

    } catch (err) {
        next(err);
    }
}

export const findByCriteria = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.validated!.query as UserQuery;

        const criteria = compact<UserCriteria>({
            id: query.id,
            username: query.username,
            email: query.email,
        });

        const options: QueryOptions = {
            limit: query.limit,
            offset: query.offset,
            order: query.sortBy
                ? [[query.sortBy, query.sortDirection || "ASC"]]
                : undefined,
        };

        const result = await userService.findByCriteria(criteria, options);

        res.json(toPaginatedResponse(result, options));

    } catch (err) {
        next(err);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.validated!.body as UserCreate;

        const user = await userService.add(body);

        res.status(201).json(user);

    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated!.params as UserParams;
        const body = req.validated!.body as UserUpdate;
        const user = req.context.user!;

        const updatedUser = await userService.update(params.id, body, user);

        res.json(updatedUser);

    } catch (err) {
        next(err);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.validated!.params as UserParams;
        const user = req.context.user!;

        await userService.remove(params.id, user);

        res.status(204).send();

    } catch (err) {
        next(err);
    }
}
