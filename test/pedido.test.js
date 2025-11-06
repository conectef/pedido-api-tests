import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

describe('Pedidos', () => {
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

    it('Deve retornar 400 quando não preencher dados obrigatórios', async () => {
            const responseLogin = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request(process.env.BASE_URL)
                .post('/api/pedidos')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'mesa': '',
                    'itens': '12345'
                })
            expect(response.status).to.equal(400)
        })

        it('Deve retornar 403 quando não tiver acesso', async () => {
            const responseLogin = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Rodrigo',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request(process.env.BASE_URL)
                .post('/api/pedidos')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'mesa': '7',
                    'itens': 'Boi assado'
                })
            expect(response.status).to.equal(403)
    })

})



