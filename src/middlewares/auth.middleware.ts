import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

export const authenticate = (req: Request, res: Response, next: NextFunction) : void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            message: 'Acess token missing or malformed'
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = verifyAccessToken(token);
        req.user = {
            id: payload.id,
            role: payload.role as any
        };
        next();
    }
    catch{
        res.status(401).json({
            message: 'Invalid or expired access token'
        });
    }
}