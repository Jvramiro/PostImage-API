import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

export default app;