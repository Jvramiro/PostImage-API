import 'reflect-metadata';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import app from './app';
import { connectDatabase } from './config/database';
import { seedAdmin } from './seeders/admin.seeder';
import { env } from './config/env.config';

const start = async (): Promise<void> => {
    await connectDatabase();
    await seedAdmin();
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}

start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});