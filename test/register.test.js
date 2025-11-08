import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('Register', () => {
    const baseUrl = process.env.BASE_URL;
    const usuarioExistente = {
        nome: 'Melissa',
        tipo: 'garçom',
        senha: '123456',
        mesa: '6'
    };

    before(async () => {
        // Cria o usuário uma vez antes dos testes
        await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(usuarioExistente);
    });

    describe('POST /register', () => {
        it('Deve retornar 201 quando usar credenciais válidas', async () => {
            const response = await request(baseUrl)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    nome: `Melissa_${Date.now()}`,
                    tipo: 'garçom',
                    senha: '123456',
                    mesa: '6'
                });
            expect(response.status).to.equal(201);
        });

        it('Deve retornar 409 para usuário já existente', async () => {
            const response = await request(baseUrl)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send(usuarioExistente);
            expect(response.status).to.equal(409);
        });

        it('Deve retornar 400 para dados obrigatórios', async () => {
            const response = await request(baseUrl)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    nome: '',
                    tipo: 'garçom',
                    senha: '123456',
                    mesa: '6'
                });
            expect(response.status).to.equal(400);
        });
    });
});
