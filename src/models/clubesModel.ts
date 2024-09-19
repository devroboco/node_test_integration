import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

const ClubesModel = sequelize.define("clubes", {
  nome: {
    type: DataTypes.STRING,
  },
  liga: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  pais: {
    type: DataTypes.STRING,
  },
  estadio: {
    type: DataTypes.STRING,
  },
});

ClubesModel.sync();

export { ClubesModel };
