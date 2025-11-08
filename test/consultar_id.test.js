import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL;

describe('Consultar tempo do pedido', () => {
    let token;
    let pedidoId;

    before(async () => {
        const usuario = {
            nome: `Gerente_${Date.now()}`,
            tipo: 'gerente',
            senha: '123456',
            mesa: '1'
        };

        const resRegister = await request(baseUrl)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(usuario);

        expect(resRegister.status).to.be.oneOf([200, 201]);

        // Fazer login
        const responseLogin = await request(baseUrl)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ nome: usuario.nome, senha: usuario.senha });

        expect(responseLogin.status).to.equal(200);
        token = responseLogin.body.token;
        expect(token).to.be.a('string');

        // Criar um pedido
        const responsePedido = await request(baseUrl)
            .post('/api/pedidos')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                mesa: '5',
                itens: 'Feijoada completa'
            });

        expect(responsePedido.status).to.be.oneOf([200, 201]);
        pedidoId = responsePedido.body.id || 1;
    });

    it('Deve retornar 200 e o tempo estimado de preparo do pedido', async () => {
        const response = await request(baseUrl)
            .get(`/api/pedidos/${pedidoId}/tempo`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        console.log('Resposta da API:', response.body);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('tempoEspera');
        expect(response.body.tempoEspera).to.be.a('number');
    });

    it('Deve retornar 404 para pedido inexistente', async () => {
        const response = await request(baseUrl)
            .get('/api/pedidos/99999/tempo')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(404);
    });

    it('Deve retornar 401 se o token não for enviado', async () => {
        const response = await request(baseUrl)
            .get(`/api/pedidos/${pedidoId}/tempo`)
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(401);
    });
});
