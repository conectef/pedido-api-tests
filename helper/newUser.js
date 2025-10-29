import request from "supertest";

export async function createNewUser() {
  const newUser = {
    nome: `Melissa_${Date.now()}`,
    tipo: 'garçom',
    senha: '123456',
    mesa: '6',
  };

  await request("http://localhost:3000")
    .post("/api/register")
    .set("Content-Type", "application/json")
    .send(newUser);

  return newUser;
}
