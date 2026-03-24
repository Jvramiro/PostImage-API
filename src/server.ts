import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();