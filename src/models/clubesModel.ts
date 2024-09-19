import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

const ClubesModel = sequelize.define("clubes", {
  nome: {
    type: DataTypes.STRING,
  },
});

ClubesModel.sync();

export { ClubesModel };
