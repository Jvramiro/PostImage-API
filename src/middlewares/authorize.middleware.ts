import { Request, Response, NextFunction } from 'express';
import { UserRole } from "../enums/UserRole";

export const authorize = (...roles: UserRole[]) => {

    return (req: Request, res: Response, next: NextFunction): void => {

        if(!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                message: 'Forbidden: insufficient permissions'
            });
            return;
        }

        next();

    }

}