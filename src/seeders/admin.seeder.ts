import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';
import { env } from '../config/env.config';

export const seedAdmin = async (): Promise<void> => {
    const existing = await User.findOne({
        where: { email: env.DB_ADMIN_EMAIL }
    });

    if(existing) {
        return;
    }

    await User.create({
        username: env.DB_ADMIN_USERNAME,
        email: env.DB_ADMIN_EMAIL,
        password: env.DB_ADMIN_PASSWORD,
        role: UserRole.ADMIN
    });
} 