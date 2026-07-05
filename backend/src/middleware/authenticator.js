export const authenticator = (req, res, next) => {
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    req.user = user;

    next();
};