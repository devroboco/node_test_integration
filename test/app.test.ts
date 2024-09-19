import request from "supertest";
import app from "../src/app";

describe("API de Clubes e Jogadores", () => {
  it("deve cadastrar um clube com sucesso", async () => {
    const response = await request(app)
      .post("/api/clubes")
      .send({ nome: "Clube A" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Clube A");
  });

  it("deve cadastrar um jogador em um clube existente", async () => {
    await request(app).post("/api/clubes").send({ nome: "Clube B" });

    const response = await request(app)
      .post("/api/jogadores")
      .send({ nome: "Jogador 1", clubeId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Jogador 1");
    expect(response.body.clube_id).toBe(1);
  });

  it("não deve cadastrar um jogador em um clube inexistente", async () => {
    const response = await request(app)
      .post("/api/jogadores")
      .send({ nome: "Jogador 2", clubeId: 999 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Clube não encontrado");
  });

  it("deve listar clubes cadastrados", async () => {
    await request(app).post("/api/clubes").send({ nome: "Clube C" });
    const response = await request(app).get("/api/clubes");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
  });

  it("deve listar jogadores cadastrados", async () => {
    await request(app).post("/api/clubes").send({ nome: "Clube D" });
    await request(app)
      .post("/api/jogadores")
      .send({ nome: "Jogador 3", clubeId: 1 });

    const response = await request(app).get("/api/jogadores");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
  });
});
