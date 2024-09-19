import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  logging: false,
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export { sequelize };
