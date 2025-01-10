import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const jwtSecret = JWT_SECRET;

if (!jwtSecret) {
    throw new Error("jwtSecret is not defined in the environment variables");
}

interface DecodedToken {
    userId: string;
    role: string;
    [key: string]: any;
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token not provided. Unauthorized access." });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

        console.log(decoded)

        if (decoded.role !== "Admin") {
            res.status(403).json({ message: "Unauthorized access" });
            return;
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token. Unauthorized access." });
        return;
    }
};
