import type { RequestHandler } from "express";
import type { z, ZodSchema } from "zod";

type ValidationSchema = {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
};

export const validate = ({ body, params, query }: ValidationSchema): RequestHandler => {

    return (req, res, next) => {

        const result = {
            body: body?.safeParse(req.body),
            params: params?.safeParse(req.params),
            query: query?.safeParse(req.query),
        };

        for (const [key, parsed] of Object.entries(result)) {

            if (parsed && !parsed.success) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: parsed.error.flatten(),
                });
            }

            if (parsed?.success) {
                req.validated ??= {};
                req.validated[key as keyof typeof req.validated] = parsed.data;
            }
        }

        next();

    };
};