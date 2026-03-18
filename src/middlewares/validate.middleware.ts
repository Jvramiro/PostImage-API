import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from "zod";

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
                res.status(400).json({
                    message: 'Validation Error',
                    errors: error.issues.map((e) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                });
                return;
            }
            next(error);
        }

    }

}