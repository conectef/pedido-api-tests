import request from 'supertest';
import { expect } from 'chai';


describe('Register', () => {
    describe('POST /register', () => {
        it('Deve retornar 201 quando usar credenciais válidas', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': `Melissa_${Date.now()}`,
                    'tipo': 'garçom',
                    'senha': '123456',
                    'mesa': '6'
                })
            expect(response.status).to.equal(201)
        })

        it('Deve retornar 409 para usuarios já existente', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Melissa',
                    'tipo': 'garçom',
                    'senha': '123456',
                    'mesa': '6'
                })
            expect(response.status).to.equal(409)
        })

        it('Deve retornar 400 para dados obrigatórios', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': '',
                    'tipo': 'garçom',
                    'senha': '123456',
                    'mesa': '6'
                })
            expect(response.status).to.equal(400)
        })
    })
})