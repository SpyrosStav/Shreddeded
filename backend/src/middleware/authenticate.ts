import type { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    req.context.user = user;

    next();
};