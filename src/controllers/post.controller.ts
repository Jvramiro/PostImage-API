import { Request, Response, NextFunction } from 'express';
import { PostService } from "../services/post.service";
import { CreatePostInput } from '../schemas/post.schema';

const postService = new PostService();

export class PostController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const post = await postService.create(req.user!.id, req.body as CreatePostInput);
            res.status(201).json(post);
        }
        catch (error){
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const posts = await postService.findAll();
            res.status(200).json(posts);
        }
        catch (error){
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const post = await postService.findById(Number(req.params.id));
            res.status(200).json(post);
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