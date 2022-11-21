import jwt from "jsonwebtoken";
export const createAccessToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: "10m",
    });
};
export const createRefreshToken = (user) => {
    return jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: "7d",
    });
};
export const sendRefreshToken = (res, user) => {
    res.cookie("jwtcookie", createRefreshToken(user), {
        httpOnly: true,
        path: "/refresh_token",
    });
};
export const clearRefreshToken = (res) => {
    res.cookie("jwtcookie", "", {
        httpOnly: true,
        path: "/refresh_token",
    });
};
export const sendInvalidToken = (res) => {
    res.send({ ok: false, accessToken: "" });
};
export const isAuth = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("User not authenticated.");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        context.payload = payload;
    }
    catch (err) {
        throw new Error("Not authorized");
    }
    return next();
};
