import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from "zod";
import { sendError } from '../utils/response.utils';

export const validate = (schema: ZodType) => {

    return (req: Request, res: Response, next: NextFunction): void => {

        try{
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        }
        catch(error){
            if(error instanceof ZodError){
                sendError(res, 'Validation error', 400, error.issues.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message
                })));
                return;
            }
            next(error);
        }

    }

}