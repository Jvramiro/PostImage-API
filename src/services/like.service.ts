import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { User } from "../models/User";

export class LikeService{

    async toggle(userId: number, postId: number): Promise<{ liked: boolean }> {

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        const existing = await Like.findOne({
            where: { userId, postId }
        });

        if(existing) {
            await existing.destroy();
            return {
                liked: false
            };
        }

        await Like.create({
            userId,
            postId
        });

        return { liked: true };
    }

    async countByPost(postId: number): Promise<number> {
        return Like.count({
            where: { postId }
        });
    }

}