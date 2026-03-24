import { Request, Response, NextFunction } from 'express';
import { AuthService } from "../services/auth.service";
import { RefreshTokenInput, RegisterInput } from '../schemas/auth.schema';
import { sendSuccess } from '../utils/response.utils';

const authService = new AuthService();

export class AuthController {

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokens = await authService.register(req.body as RegisterInput);
            res.status(201).json(tokens);
            sendSuccess(res, tokens, 201);
        }
        catch(error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokens = await authService.login(req.body as RegisterInput);
            sendSuccess(res, tokens);
        }
        catch(error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { refreshToken } = req.body as RefreshTokenInput;
            const tokens = await authService.refresh(refreshToken);
            sendSuccess(res, tokens);

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