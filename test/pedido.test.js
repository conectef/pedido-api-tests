import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL;

describe('Registrar Pedidos', () => {
    let token;
    let pedidoId;

    const usuario = {
        nome: `Gerente_${Date.now()}`,
        tipo: 'gerente',
        senha: '123456',
        mesa: '1'
    };

    before(async () => {
        // Registrar gerente
        await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(usuario);

        // Login para obter token
        const responseLogin = await request(baseUrl)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ nome: usuario.nome, senha: usuario.senha });

        token = responseLogin.body.token;
        expect(token).to.be.a('string');
    });

    it('Deve registrar um novo pedido com sucesso (201)', async () => {
        const response = await request(baseUrl)
            .post('/api/pedidos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                mesa: '5',
                itens: 'Feijoada completa, Suco de laranja'
            });

        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property('id');
        expect(response.body.mesa).to.equal('5');

        pedidoId = response.body.id;
        console.log('🆕 Pedido criado com ID:', pedidoId);
    });

    it('Deve retornar 400 quando não preencher dados obrigatórios', async () => {
        const response = await request(baseUrl)
            .post('/api/pedidos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                mesa: '', // campo obrigatório vazio
                itens: '12345'
            });

        expect(response.status).to.equal(400);
    });

    it('Deve retornar 403 quando usuário sem permissão tentar criar pedido', async () => {
        // Registrar usuário comum (garçom, cliente etc.)
        const userSemAcesso = {
            nome: `Cliente_${Date.now()}`,
            tipo: 'cliente',
            senha: '123456'
        };

        await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(userSemAcesso);

        const responseLogin = await request(baseUrl)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                nome: userSemAcesso.nome,
                senha: userSemAcesso.senha
            });

        const tokenSemAcesso = responseLogin.body.token;

        const response = await request(baseUrl)
            .post('/api/pedidos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${tokenSemAcesso}`)
            .send({
                mesa: '9',
                itens: 'Picanha com fritas'
            });

        expect(response.status).to.equal(403);
    });
});
