import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

const JogadoresModel = sequelize.define("jogadores", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nasc: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  num_camisa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  posicao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nacionalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inicio_contrato: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fim_contrato: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  clube_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "clubes",
      key: "id",
    },
  },
});

JogadoresModel.sync();

export { JogadoresModel };
