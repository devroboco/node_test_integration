import express, { Request, Response } from "express";
import { clubes, jogadores } from "./data";

const router = express.Router();

router.post("/clubes", (req: Request, res: Response) => {
  const { nome } = req.body;
  const id = clubes.length + 1;
  const novoClube = { id, nome };
  clubes.push(novoClube);
  res.status(201).json(novoClube);
});

router.post("/jogadores", (req: Request, res: Response) => {
  const { nome, clubeId } = req.body;
  const id = jogadores.length + 1;
  const clubeExiste = clubes.find((clube) => clube.id === clubeId);

  if (!clubeExiste) {
    return res.status(400).json({ error: "Clube não encontrado" });
  }

  const novoJogador = { id, nome, clubeId };
  jogadores.push(novoJogador);
  res.status(201).json(novoJogador);
});

router.get("/clubes", (req: Request, res: Response) => {
  res.status(200).json(clubes);
});

router.get("/jogadores", (req: Request, res: Response) => {
  res.status(200).json(jogadores);
});

export default router;
