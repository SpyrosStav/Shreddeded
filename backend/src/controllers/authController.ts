import type { Request, Response } from "express";
import type { LoginRequest } from "../dtos/auth/login.validation.js";
import * as authService from "../services/authService.js";

export const login = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.validated!.body as LoginRequest;

    const user = await authService.login(
        emailOrUsername,
        password
    );

    req.session.user = {
        id: user.id,
        role: user.role
    };

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    });
};