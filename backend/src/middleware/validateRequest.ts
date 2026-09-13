import type { RequestHandler } from "express";
import type { z } from "zod";

type ValidationSchema = {
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
};

export const validate = ({ body, params, query }: ValidationSchema): RequestHandler => {

    return (req, res, next) => {

        const result = {
            body: body?.safeParse(req.body),
            params: params?.safeParse(req.params),
            query: query?.safeParse(req.query),
        };

        const errors: Record<string, unknown> = {};
        let hasErrors = false;

        for (const [key, parsed] of Object.entries(result)) {
            if (!parsed) continue;

            if (!parsed.success) {
                hasErrors = true;
                errors[key] = parsed.error!.flatten();
                continue;
            }

            req.validated ??= {};
            req.validated[key as keyof typeof req.validated] = parsed.data;
        }

        if (hasErrors) {
            return res.status(400).json({
                message: "Validation failed",
                errors,
            });
        }

        next();

    };
};