import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const generateToken = (payload, secret, expiresIn) => {
    if (!secret) {
        throw new Error("JWT secret is not defined. Check your environment variables.");
    }
    return jwt.sign(payload, secret, { expiresIn });
};

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: true, message: "No token provided" });
    }
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: true, message: "Invalid token" });
    }
});
