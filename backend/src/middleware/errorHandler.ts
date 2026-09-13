import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";
import { AppError } from "../errors/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Malformed JSON",
        });
    }

    if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ message: "Resource already exists" });
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.errors.map(e => e.message),
        });
    }

    if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ message: "Invalid reference" });
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
