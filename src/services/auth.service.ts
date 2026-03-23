import { UserRole } from "../enums/UserRole";
import { RefreshToken } from "../models/RefreshToken";
import { User } from "../models/User";
import { RegisterInput } from "../schemas/auth.schema";
import { generateAcessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.utils";

export class AuthService {

    async register(data: RegisterInput): Promise<{ accessToken: string; refreshToken: string }> {
        const existingUser = await User.findOne({
            where: { email: data.email }
        });

        if(existingUser) {
            throw new Error('Email already in user');
        }

        const user = await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
            role: UserRole.USER
        })

        return this.generateTokenPair(user);
    }

    async refresh(token: string): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = verifyRefreshToken(token);

        const storedToken = await RefreshToken.findOne({
            where: { token }
        });
        if(!storedToken || storedToken.expiresAt < new Date()) {
            throw new Error('Refresh token invalid or expired')
        }

        const user = await User.findByPk(payload.id);
        if(!user){
            throw new Error('User not found');
        }

        await storedToken.destroy();
        return this.generateTokenPair(user);
    }

    async logout(token: string): Promise<void> {
        const storedToken = await RefreshToken.findOne({
            where: { token }
        });
    }

    private async generateTokenPair(user: User): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = {
            id: user.id,
            role: user.role
        }

        const accessToken = generateAcessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';
        const expiresAt = new Date();

        const match = refreshExpiresIn.match(/^(\d+)([dhm])$/);
        if(match){
            const value = parseInt(match[1]);
            const unit = match[2];
            if (unit === 'd') expiresAt.setDate(expiresAt.getDate() + value);
            else if (unit === 'h') expiresAt.setHours(expiresAt.getHours() + value);
            else if (unit === 'm') expiresAt.setMinutes(expiresAt.getMinutes() + value);
        }

        await RefreshToken.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: expiresAt
        });

        return { accessToken, refreshToken };
    }
}