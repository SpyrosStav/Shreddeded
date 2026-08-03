import type { NextFunction, Request, Response } from "express";
import type { UserCreate } from "../dtos/auth/user.validation.js";
import * as userService from "../services/userService.js";

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.validated?.body as UserCreate;

        const user = await userService.register(body);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
}