import request from 'supertest';
import { expect } from 'chai';

describe('Pedidos', () => {
    describe('POST /pedidos', () => {
        it('Deve retornar 201 com pedido criado', async () => {
            const responseLogin = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request("http://localhost:3000")
                .post('/api/pedidos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'mesa': '8',
                    'itens': 'vaca atolada'
                })
            expect(response.status).to.equal(201)
        })

        it('Deve retornar 400 quando não preencher dados obrigatórios', async () => {
            const responseLogin = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request("http://localhost:3000")
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
            const responseLogin = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Rodrigo',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request("http://localhost:3000")
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
})
