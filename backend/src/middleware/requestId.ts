import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";

export const requestId = (req: Request, res: Response, next: NextFunction) => {

    req.context = {
        requestId: crypto.randomUUID()
    }

    next();
};