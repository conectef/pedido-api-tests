import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.BASE_URL;

describe('Logar na API com Banco em Memória', () => {

  const usuario = {
    nome: `Melissa_${Date.now()}`,
    tipo: 'garçom',
    senha: '123456',
    mesa: '6'
  };

  before(async () => {
    const res = await request(baseUrl)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(usuario);

    expect(res.status).to.be.oneOf([200, 201]);
  });

  describe('POST /api/login', () => {

    it('Deve retornar 200 com um token válido ao usar credenciais corretas', async () => {
      const res = await request(baseUrl)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(usuario);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      expect(res.body.token).to.be.a('string');
    });

    it('Deve retornar 401 ao usar credenciais incorretas', async () => {
      const res = await request(baseUrl)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({
          nome: 'Melissa',
          senha: 'senhaErrada'
        });

      expect(res.status).to.equal(401);
    });

    it('Deve retornar 401 quando não enviar usuário e senha', async () => {
      const res = await request(baseUrl)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ nome: '', senha: '' });

      expect(res.status).to.equal(401);
    });

    it('Deve retornar 401 quando enviar apenas senha', async () => {
      const res = await request(baseUrl)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ nome: '', senha: '123456' });

      expect(res.status).to.equal(401);
    });

    it('Deve retornar 401 quando enviar apenas usuário', async () => {
      const res = await request(baseUrl)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send({ nome: 'Melissa', senha: '' });

      expect(res.status).to.equal(401);
    });
  });
});
