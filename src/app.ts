import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes/routes';
import { errorHandler } from './middlewares/error.middleware';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
})

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', limiter, router);
app.use('/api/auth', authLimiter);
app.use(errorHandler);

export default app;