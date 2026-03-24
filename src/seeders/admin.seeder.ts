import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';
import { env } from '../config/env.config';

dotenv.config();

const ADMIN_USERNAME = env.DB_ADMIN_USERNAME as string;
const ADMIN_EMAIL = env.DB_ADMIN_USERNAME as string;
const ADMIN_PASSWORD = env.DB_ADMIN_USERNAME as string;

const seed = async (): Promise<void> => {
    await connectDatabase();

    const existing = await User.findOne({
        where: { email: ADMIN_EMAIL }
    });

    if(existing) {
        process.exit();
    }

    await User.create({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: UserRole.ADMIN
    });

    process.exit();
} 

seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
})