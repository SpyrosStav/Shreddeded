import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Malformed JSON",
        });
    }

    if (err instanceof AppError) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
};