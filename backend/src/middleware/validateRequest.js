export const validate = ({ body, params, query }) => (req, res, next) => {
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

        if (parsed) req[key] = parsed.data;
    }

    next();
};