const SLOW_THRESHOLD_MS = 200;

const SENSITIVE_KEYS = [
    "password",
    "token",
    "refreshToken",
    "authorization",
    "creditCard"
];

const sanitize = (obj = {}) => {

    const clone = { ...obj };

    for (const key of SENSITIVE_KEYS) {
        if (key in clone) {
            clone[key] = "[REDACTED]";
        }
    }

    return clone;
};

export const logger = (req, res, next) => {

    const start = Date.now();

    const requestId = req.context.requestId;
    const method = req.method;
    const url = req.originalUrl;
    const safeBody = sanitize(req.body);
    const userId = req.user?.id ?? null;

    res.on("finish", () => {
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
            body: sanitize(req.body),
            timestamp: new Date().toISOString()
        };

        console.log(JSON.stringify(log));
    });

    next();
};