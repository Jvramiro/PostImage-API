import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { CreateCommentInput, UpdateCommentInput } from "../schemas/comment.schema";

export class CommentService {

    async create(userId: number, postId: number, data: CreateCommentInput): Promise<Comment> {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        return Comment.create({
            userId: userId,
            postId: postId,
            content: data.content
        });
    }

    async findByPost(postId: number): Promise<Comment[]> {
        return Comment.findAll({
            where: { postId },
            include: [
                { model: User, attributes: ['id', 'username' ] }
            ],
            order: [
                ['createdAt', 'ASC']
            ]
        });
    }

    async update(id: number, userId: number, userRole: string, data: UpdateCommentInput): Promise<Comment> {
        const comment = await Comment.findByPk(id);

        if(!comment){
            throw new Error('Comment not found');
        }

        if(comment.userId !== userId && userRole !== 'admin') {
            throw new Error('Forbidden');
        }

        return comment.update({
            content: data.content
        })
    }

    async destroy(id: number, userId: number, userRole: string): Promise<void> {
        const comment = await Comment.findByPk(id);

        if(!comment){
            throw new Error('Comment not found');
        }

        if(comment.userId !== userId && userRole !== 'admin') {
            throw new Error('Forbidden');
        }

        await comment.destroy();
    }

}