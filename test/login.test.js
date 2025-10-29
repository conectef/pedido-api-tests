import request from 'supertest';
import { expect } from 'chai';


describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Melissa',
                    'senha': '123456'
                })
            expect(response.status).to.equal(200)
            expect(response.body.token).to.be.a('string')
        })

        it('Deve retornar 401 quando usar credenciais inválidas', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Carlos',
                    'senha': '12345'
                })
            expect(response.status).to.equal(401)
        })

        it('Deve retornar 401 quando não preencher usuario e senha', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': '',
                    'senha': ''
                })
            expect(response.status).to.equal(401)
        })

        it('Deve retornar 401 quando só preencher senha', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': '',
                    'senha': '123456'
                })
            expect(response.status).to.equal(401)
        })

        it('Deve retornar 401 quando só preencher usuario', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Carlos',
                    'senha': ''
                })
            expect(response.status).to.equal(401)
        })
    })
})