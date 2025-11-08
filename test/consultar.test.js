import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL;

describe('Consultar Pedidos', () => {

    let token = '';

    before(async () => {
        // Registrar e logar gerente (para ter permissão)
        const usuario = {
            nome: `Gerente_${Date.now()}`,
            tipo: 'gerente',
            senha: '123456',
            mesa: '1'
        };

        await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(usuario);

        const responseLogin = await request(baseUrl)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ nome: usuario.nome, senha: usuario.senha });

        token = responseLogin.body.token;
        expect(token).to.be.a('string');
    });

    it('Deve retornar 200 com a lista de pedidos', async () => {
        const response = await request(baseUrl)
            .get('/api/pedidos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('Deve retornar 403 quando um garçom tentar acessar pedidos sem permissão', async () => {
        const usuario = {
            nome: `Garcom_${Date.now()}`,
            tipo: 'garçom',
            senha: '123456',
            mesa: '3'
        };

        await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(usuario);

        const loginGarcom = await request(baseUrl)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ nome: usuario.nome, senha: usuario.senha });

        const tokenGarcom = loginGarcom.body.token;

        const response = await request(baseUrl)
            .get('/api/pedidos')
            .set('Authorization', `Bearer ${tokenGarcom}`);

        expect(response.status).to.equal(403);
    });
});
