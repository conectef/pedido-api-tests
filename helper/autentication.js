import request from 'supertest';
import postLogin from '../fixtures/postLogin.json' assert { type: 'json' };

export async function obterToken(nome, senha) {
    const bodyLogin = { ...postLogin };
    const respostaLogin = await request('http://localhost:3000')
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);
    return respostaLogin.body.token;
}