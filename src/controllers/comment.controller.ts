import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';
import { CreateCommentInput, UpdateCommentInput } from '../schemas/comment.schema';
import { sendSuccess } from '../utils/response.utils';

const commentService = new CommentService();

export class CommentController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const comment = await commentService.create(req.user!.id, Number(req.params.postId), req.body as CreateCommentInput);
            sendSuccess(res, comment, 201);
        }
        catch (error){
            next(error);
        }
    }

    async findByPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const comments = await commentService.findByPost(Number(req.params.postId));
            sendSuccess(res, comments);
        }
        catch (error){
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const comment = await commentService.update(Number(req.params.id), req.user!.id, req.user!.role, req.body as UpdateCommentInput);
            sendSuccess(res, comment);
        }
        catch (error){
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            await commentService.destroy(Number(req.params.id), req.user!.id, req.user!.role);
            res.status(204).send();
        }
        catch (error){
            next(error);
        }
    }

}