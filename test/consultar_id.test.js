import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();


describe('Consultar tempo do pedido', () => {
    let token;
    let pedidoId;

    before(async () => {
        const responseLogin = await request(process.env.BASE_URL)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                nome: 'Melissa',
                senha: '123456'
            });

        token = responseLogin.body.token;

        const responsePedido = await request(process.env.BASE_URL)
            .post('/api/pedidos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                mesa: '5',
                itens: 'Feijoada completa'
            });

        pedidoId = responsePedido.body.id || 1;
    });

    it('Deve retornar 200 e o tempo estimado de preparo do pedido', async () => {
        const response = await request(process.env.BASE_URL)
            .get(`/api/pedidos/${pedidoId}/tempo`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

            console.log('Resposta da API:', response.body);


        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('tempoEspera');
        expect(response.body.tempoEspera).to.be.a('number');
    });

    it('Deve retornar 404 para pedido inexistente', async () => {
        const response = await request(process.env.BASE_URL)
            .get('/api/pedidos/99999/tempo')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(404);
    });

    it('Deve retornar 401 se o token não for enviado', async () => {
        const response = await request(process.env.BASE_URL)
            .get(`/api/pedidos/${pedidoId}/tempo`)
            .set('Content-Type', 'application/json');

        expect(response.status).to.equal(401);
    });
});
