import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 54321,
    logging: true,
  }
);
export default sequelize;
