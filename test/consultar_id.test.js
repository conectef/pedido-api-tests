import request from 'supertest';
import { expect } from 'chai';
// require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();


describe.only('Consultar', () => {
    describe('GET /pedidos', () => {
        it('Deve retornar 200 com o tempo de espera por id', async () => {
            const responseRegister = await request(process.env.BASE_URL)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'tipo': 'gerente',
                    'senha': '123456',
                    'mesa': '2'
                })
            const responseLogin = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const responsePedido = await request(process.env.BASE_URL)
                .post('/api/pedidos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'mesa': '2',
                    'itens': 'vaca atolada'
                    })

            const response = await request(process.env.BASE_URL)
                .get('/api/pedidos/{2}/tempo')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200)
        })

        it('Deve retornar 401 para token ausente', async () => {
            const responseLogin = await request(process.env.BASE_URL)
            // const response = await request(process.env.BASE_URL)
                .post('/api/pedidos/{2}/tempo')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(401)
        })

    })
})