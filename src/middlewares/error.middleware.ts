import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {

    if(res.headersSent){
        return;
    }

    console.error(error);

    const message = error.message || 'Internal server error';

    const statusCode = error.statusCode ?? (() => {
        switch (message) {
            case 'Invalid credentials':
            case 'Refresh token invalid or expired':
            case 'Invalid or expired access token':
                return 401;
            case 'Forbidden':
                return 403;
            case 'Post not found':
            case 'Comment not found':
            case 'User not found':
                return 404;
            case 'Email already in use':
                return 409;
            default:
                return 500;
        }
    })();

    res.status(statusCode).json({
        message: message
    });
}


