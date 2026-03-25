import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/routes';
import { errorHandler } from './middlewares/error.middleware';
import { limiter } from './middlewares/rate-limit.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', limiter, router);
app.use(errorHandler);

export default app;