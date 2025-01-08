import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";


if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

interface DecodedToken {
    userId: string;
    [key: string]: any;
}



export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided. Unauthorized access." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token. Unauthorized access." });
    }
};
