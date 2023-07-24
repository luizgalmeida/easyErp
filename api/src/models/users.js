import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("users", {
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: new Date,
  },
  updated: {
    type: Sequelize.DATE
  },
  partnerId: {
    type: Sequelize.INTEGER
  },
  image: {
    type: Sequelize.STRING,
  },
  access: {
    type: Sequelize.STRING,
    defaultValue: 'BASIC',
    allowNull: false,
  },
  active: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
});
