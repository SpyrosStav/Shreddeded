import crypto from "crypto";

export const requestId = (req, res, next) => {

    req.context = {
        requestId: crypto.randomUUID()
    }

    next();
};