import * as dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';

dotenv.config();

const ADMIN_USERNAME = process.env.DB_ADMIN_USERNAME as string;
const ADMIN_EMAIL = process.env.DB_ADMIN_USERNAME as string;
const ADMIN_PASSWORD = process.env.DB_ADMIN_USERNAME as string;

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