import express, { Request, Response } from "express";
import { ClubesModel } from "./models/clubesModel";
import { JogadoresModel } from "./models/jogadoresModel";

const router = express.Router();

router.post("/clubes", async (req: Request, res: Response) => {
  const { nome, liga, cidade, pais, estadio } = req.body;

  if (!nome || !liga || !cidade || !pais || !estadio) {
    return res.status(400).json({
      error: "Erro ao criar o clube , todos os campos são obrigatórios",
    });
  }

  const clube = await ClubesModel.create({
    nome: nome,
    liga: liga,
    cidade: cidade,
    pais: pais,
    estadio: estadio,
  });

  res.status(201).json({
    id: clube.dataValues?.id,
    nome: clube.dataValues?.nome,
    liga: clube.dataValues?.liga,
    cidade: clube.dataValues?.cidade,
    pais: clube.dataValues?.pais,
    estadio: clube.dataValues?.estadio,
  });
});

router.post("/jogadores", async (req: Request, res: Response) => {
  const {
    nome,
    clubeId,
    data_nasc,
    num_camisa,
    posicao,
    nacionalidade,
    inicio_contrato,
    fim_contrato,
  } = req.body;

  const clube = await ClubesModel.findOne({
    where: {
      id: clubeId,
    },
  });

  if (!clube) {
    return res.status(400).json({ error: "Clube não encontrado" });
  }

  const jogador = await JogadoresModel.create({
    nome: nome,
    clube_id: clubeId,
    data_nasc: data_nasc,
    num_camisa: num_camisa,
    posicao: posicao,
    nacionalidade: nacionalidade,
    inicio_contrato: inicio_contrato,
    fim_contrato: fim_contrato,
  });

  res.status(201).json({
    id: jogador.dataValues?.id,
    nome: jogador.dataValues?.nome,
    clube_id: jogador.dataValues?.clube_id,
    data_nasc: jogador.dataValues?.data_nasc,
    num_camisa: jogador.dataValues?.num_camisa,
    posicao: jogador.dataValues?.posicao,
    nacionalidade: jogador.dataValues?.nacionalidade,
    inicio_contrato: jogador.dataValues?.inicio_contrato,
    fim_contrato: jogador.dataValues?.fim_contrato,
  });
});

router.get("/clubes", async (req: Request, res: Response) => {
  const clubes = await ClubesModel.findAll();
  res.status(200).json(clubes);
});

router.get("/jogadores", async (req: Request, res: Response) => {
  const jogadores = await JogadoresModel.findAll();
  res.status(200).json(jogadores);
});

export default router;
