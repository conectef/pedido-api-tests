import request from 'supertest';
import { expect } from 'chai';
import { createNewUser } from '../helper/newUser.js';
import { obterToken } from '../helper/autentication.js';

beforeEach(async () => {
  newUser = await createNewUser();
  token = await obterToken(newUser.nome, newUser.senha);
  bodyTransfers = { ...postTransfers, from: newUser.nome };
});

describe.only('Pedidos', () => {
    describe('POST /pedidos', () => {
        it('Deve retornar 201 com pedido criado', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/pedidos')
                .set('Content-Type', 'application/json')
                .send({
                    'mesa': '5',
                    'itens': 'vaca atolada'
                })
            expect(response.status).to.equal(201)
        })

        it('Deve retornar 400 quando não preencher dados obrigatórios', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'mesa': '',
                    'itens': '12345'
                })
            expect(response.status).to.equal(400)
        })

        it('Deve retornar 403 quando não tiver acesso', async () => {
            const response = await request("http://localhost:3000")
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'mesa': '7',
                    'itens': 'Boi assado'
                })
            expect(response.status).to.equal(403)
        })

    })
})
