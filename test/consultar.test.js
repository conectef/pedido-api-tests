import request from 'supertest';
import { expect } from 'chai';

describe('Consultar', () => {
    describe('GET /pedidos', () => {
        it('Deve retornar 200 com a lista de pedidos', async () => {
            const responseLogin = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Antonio',
                    'senha': '123456'
                })
            const token = responseLogin.body.token

            const response = await request("http://localhost:3000")
                .get('/api/pedidos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200)
        })

        it('Deve retornar 403 para acesso negado', async () => {
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
            expect(response.status).to.equal(403)
        })

    })
})