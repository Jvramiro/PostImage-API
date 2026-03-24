import { Request, Response, NextFunction } from 'express';
import { PostService } from "../services/post.service";
import { CreatePostInput } from '../schemas/post.schema';
import { sendPaginated, sendSuccess } from '../utils/response.utils';

const postService = new PostService();

export class PostController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const post = await postService.create(req.user!.id, req.body as CreatePostInput);
            sendSuccess(res, post, 201);
        }
        catch (error){
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const { rows, count } = await postService.findAll(page, limit);
            sendPaginated(res, rows, {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            });
        }
        catch (error){
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const post = await postService.findById(Number(req.params.id));
            sendSuccess(res, post);
        }
        catch (error){
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            await postService.delete(Number(req.params.id), req.user!.id, req.user!.role);
            res.status(204).send();
        }
        catch (error){
            next(error);
        }
    }

}