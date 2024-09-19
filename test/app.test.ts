import request from "supertest";
import app from "../src/app";

describe("API de Clubes e Jogadores", () => {
  it("deve cadastrar um clube com sucesso", async () => {
    const response = await request(app).post("/api/clubes").send({
      nome: "Clube A",
      liga: "Liga A",
      cidade: "Cidade A",
      pais: "País A",
      estadio: "Estádio A",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Clube A");
    expect(response.body.liga).toBe("Liga A");
    expect(response.body.cidade).toBe("Cidade A");
    expect(response.body.pais).toBe("País A");
    expect(response.body.estadio).toBe("Estádio A");
  });

  it("não deve cadastrar um clube sem os campos obrigatórios", async () => {
    const response = await request(app).post("/api/clubes").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Erro ao criar o clube , todos os campos são obrigatórios"
    );
  });

  it("deve cadastrar um jogador em um clube existente", async () => {
    await request(app).post("/api/clubes").send({ nome: "Clube B" });

    const response = await request(app).post("/api/jogadores").send({
      nome: "Jogador 1",
      clubeId: 1,
      data_nasc: "1990-01-01",
      num_camisa: 10,
      posicao: "Atacante",
      nacionalidade: "Brasileira",
      inicio_contrato: "2024-01-01",
      fim_contrato: "2025-01-01",
    });

    expect(response.status).toBe(201);

    expect(response.body.id).toBeTruthy();
    expect(response.body.nome).toBe("Jogador 1");
    expect(response.body.clube_id).toBe(1);
    expect(response.body.data_nasc).toBe("1990-01-01T00:00:00.000Z");
    expect(response.body.num_camisa).toBe(10);
    expect(response.body.posicao).toBe("Atacante");
    expect(response.body.nacionalidade).toBe("Brasileira");
    expect(response.body.inicio_contrato).toBe("2024-01-01T00:00:00.000Z");
    expect(response.body.fim_contrato).toBe("2025-01-01T00:00:00.000Z");
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
    const response = await request(app).get("/api/jogadores");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
  });
});
