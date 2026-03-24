import { Request, Response, NextFunction } from 'express';
import { AuthService } from "../services/auth.service";
import { RefreshTokenInput, RegisterInput } from '../schemas/auth.schema';

const authService = new AuthService();

export class AuthController {

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokens = await authService.register(req.body as RegisterInput);
            res.status(201).json(tokens);
        }
        catch(error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokens = await authService.login(req.body as RegisterInput);
            res.status(200).json(tokens);
        }
        catch(error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { refreshToken } = req.body as RefreshTokenInput;
            const tokens = await authService.refresh(refreshToken);
            res.status(200).json(tokens);
        }
        catch(error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { refreshToken } = req.body as RefreshTokenInput;
            const tokens = await authService.logout(refreshToken);
            res.status(204).send();
        }
        catch(error) {
            next(error);
        }
    }


}