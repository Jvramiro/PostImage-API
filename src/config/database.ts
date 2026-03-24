import { Sequelize } from 'sequelize-typescript';
import { env } from './env.config';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
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