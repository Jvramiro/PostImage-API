import { Request, Response, NextFunction } from 'express';
import { LikeService } from '../services/like.service';

const likeService = new LikeService();

export class LikeController{

    async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const result = await likeService.toggle(req.user!.id, Number(req.body.postId));
            res.status(200).json(result);
        }
        catch (error){
            next(error);
        }
    }

    async countByPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const count = await likeService.countByPost(Number(req.body.postId));
            res.status(200).json(count);
        }
        catch (error){
            next(error);
        }
    }
    
}