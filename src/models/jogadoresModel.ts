import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

const JogadoresModel = sequelize.define("jogadores", {
  nome: {
    type: DataTypes.STRING,
  },
  clube_id: {
    type: DataTypes.NUMBER,
  },
});

JogadoresModel.sync();

export { JogadoresModel };
