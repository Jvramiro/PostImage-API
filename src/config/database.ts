import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [__dirname + '/../models'],
  logging: false,
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
  }
  catch (error) {
    process.exit(1);
  }
};

export default sequelize;