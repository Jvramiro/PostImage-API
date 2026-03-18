import z from "zod";

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(150),
        description: z.string().max(500).optional(),
        imageUrl: z.url()
    })
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];