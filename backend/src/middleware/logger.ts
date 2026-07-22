import type { Request, Response, NextFunction } from "express";

const SLOW_THRESHOLD_MS = 200;

const SENSITIVE_KEYS = [
    "password",
    "token",
    "refreshToken",
    "authorization",
    "creditCard"
];

const sanitize = (obj: Record<string, unknown> = {}) => {

    const clone = { ...obj };

    for (const key of SENSITIVE_KEYS) {
        if (key in clone) {
            clone[key] = "[REDACTED]";
        }
    }

    return clone;
};

export const logger = (req: Request, res: Response, next: NextFunction) => {

    const start = Date.now();

    const requestId = req.context.requestId;
    const method = req.method;
    const url = req.originalUrl;
    const safeBody = sanitize(req.body);

    res.on("finish", () => {
        const userId = req.context.user?.id ?? null;
        const durationMs = Date.now() - start;
        const isSlow = durationMs > SLOW_THRESHOLD_MS;

        const log = {
            requestId,
            method,
            url,
            status: res.statusCode,
            durationMs,
            slow: isSlow,
            userId,
            body: safeBody,
            timestamp: new Date().toISOString()
        };

        console.log(JSON.stringify(log));
    });

    next();
};