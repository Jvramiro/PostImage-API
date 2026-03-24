import * as jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import { env } from '../config/env.config';

interface TokenPayload {
    id: number;
    role: string;
}

export const generateAcessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: env.JWT_EXPIRES_IN as StringValue
    });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET as string, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN as StringValue
    });
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET as string) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as string) as TokenPayload
}