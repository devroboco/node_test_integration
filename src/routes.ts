import express, { Request, Response } from "express";
import { ClubesModel } from "./models/clubesModel";
import { JogadoresModel } from "./models/jogadoresModel";

const router = express.Router();

router.post("/clubes", async (req: Request, res: Response) => {
  const { nome } = req.body;
  const clube = await ClubesModel.create({
    nome: nome,
  });

  res.status(201).json({
    id: clube.dataValues?.id,
    nome: clube.dataValues?.nome,
  });
});

router.post("/jogadores", async (req: Request, res: Response) => {
  const { nome, clubeId } = req.body;

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
  });

  res.status(201).json({
    id: jogador.dataValues?.id,
    nome: jogador.dataValues?.nome,
    clube_id: jogador.dataValues?.clube_id,
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
