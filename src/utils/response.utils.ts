import { Response } from "express";

interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200): void => {
    res.status(statusCode).json({
        success: true,
        data
    })
}

export const sendPaginated = <T>(res: Response, data: T, meta: PaginationMeta): void => {
    res.status(200).json({
        success: true,
        data,
        meta
    })
}

export const sendError = (res: Response, message: string, statusCode = 500, errors?: Record<string, unknown>[]): void => {
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
}