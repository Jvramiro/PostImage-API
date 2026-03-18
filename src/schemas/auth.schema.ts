import z from "zod";

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(50),
        email: z.email(),
        password: passwordSchema
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(1)
    })
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1)
    })
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>['body'];