import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { CreatePostInput } from "../schemas/post.schema";

export class PostService{
    
    async create(userId: number, data: CreatePostInput): Promise<Post> {
        return Post.create({
            userId,
            ...data
        });
    }

    async findAll(page: number, limit: number): Promise<{ rows: Post[], count: number }> {
        const offset = (page - 1) * limit;

        return Post.findAndCountAll({
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Like, attributes: ['id', 'userId'] },
                { model: Comment, attributes: ['id'] },
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            offset
        })
    }

    async findById(id: number): Promise<Post> {
        const post = await Post.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Like, attributes: ['id', 'userId' ] },
                { model: Comment,
                    include: [{ model: User, attributes: ['id', 'username'] }]
                }
            ]
        });

        if(!post){
            throw new Error('Post not found');
        }

        return post;
    }

    async delete(id: number, userId: number, userRole: string): Promise<void> {
        const post = await Post.findByPk(id);

        if(!post) {
            throw new Error('Post not found');
        }

        if(post.userId !== userId && userRole !== 'admin'){
            throw new Error('Forbidden');
        }

        await post.destroy();
    }

    

}