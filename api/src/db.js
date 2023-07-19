import { Sequelize } from "sequelize";
import dotenv from "dotenv/config.js";

// const dbName = process.env.DB_NAME;
const dbName = 'users';
// const dbUser = process.env.DB_USER;
const dbUser = 'root';
// const dbHost = process.env.DB_HOST;
const dbHost = 'localhost';
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {

  dialect: "mysql",
  host: dbHost,
});

export default sequelize; //exportar