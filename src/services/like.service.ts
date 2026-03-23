import { Like } from "../models/Like";

export class LikeService{

    async toggle(userId: number, postId: number): Promise<{ liked: boolean }> {
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
        })
        return { liked: true };

    }

    async countByPost(postId: number): Promise<number> {
        return Like.count({
            where: { postId }
        });
    }

}