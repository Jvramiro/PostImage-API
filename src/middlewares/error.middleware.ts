import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler = (error: Error | AppError, req: Request, res: Response, next: NextFunction): void => {

    if (res.headersSent) {
        return;
    }

    console.error(error);

    const message = error.message || 'Internal server error';
    let statusCode = 500;

    if (error instanceof AppError) {
        statusCode = error.statusCode;
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
}