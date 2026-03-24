import { Request, Response, NextFunction } from 'express';
import { LikeService } from '../services/like.service';
import { sendSuccess } from '../utils/response.utils';

const likeService = new LikeService();

export class LikeController{

    async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const result = await likeService.toggle(req.user!.id, Number(req.body.postId));
            sendSuccess(res, result);
        }
        catch (error){
            next(error);
        }
    }

    async countByPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const count = await likeService.countByPost(Number(req.body.postId));
            sendSuccess(res, { count });
        }
        catch (error){
            next(error);
        }
    }
    
}