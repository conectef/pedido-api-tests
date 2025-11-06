import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('Finalizar pedido', () => {
    let token;
    let pedidoId;
    let gerenteNome;

    before(async () => {
        gerenteNome = `Melissa_${Date.now()}`;

        await request(process.env.BASE_URL)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                'nome': gerenteNome,
                'tipo': 'gerente',
                'senha': '123456',
                'mesa': '6'
            });

        const responseLogin = await request(process.env.BASE_URL)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                nome: gerenteNome,
                senha: '123456'
            });

        token = responseLogin.body.token;

        const responsePedido = await request(process.env.BASE_URL)
            .post('/api/pedidos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                mesa: '5',
                itens: 'Lagosta'
            });

        pedidoId = responsePedido.body.id || 1;
    });

    it('Deve finalizar o pedido com sucesso', async () => {
        const response = await request(process.env.BASE_URL)
            .put(`/api/pedidos/${pedidoId}/finalizar`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status');
    });

    it('Deve retornar 403 quando não tiver acesso', async () => {
        await request(process.env.BASE_URL)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                nome: 'Rodrigo',
                tipo: 'garçom',
                senha: '123456'
            });

        const responseLogin = await request(process.env.BASE_URL)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                nome: 'Rodrigo',
                senha: '123456'
            });

        const tokenFuncionario = responseLogin.body.token;

        const response = await request(process.env.BASE_URL)
            .put(`/api/pedidos/${pedidoId}/finalizar`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${tokenFuncionario}`)
            .send();


        expect(response.status).to.equal(403);
    });
});
