import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().min(1, 'PORT is required'),
  DB_HOST: z.string().min(1, 'DB_HOST is required'),
  DB_PORT: z.string().min(1, 'DB_PORT is required'),
  DB_NAME: z.string().min(1, 'DB_NAME is required'),
  DB_USER: z.string().min(1, 'DB_USER is required'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().min(1, 'JWT_EXPIRES_IN is required'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1, 'JWT_REFRESH_EXPIRES_IN is required'),
  DB_ADMIN_USERNAME: z.string().min(1, 'ADMIN_USERNAME is required'),
  DB_ADMIN_EMAIL: z.email('ADMIN_EMAIL must be a valid email'),
  DB_ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required'),
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error('Invalid environment variables:');
    parsed.error.issues.forEach((issue) => {
        console.error(`--- ${issue.path[0].toString()}: ${issue.message}`);
    })
    process.exit(1);
}

export const env = parsed.data;