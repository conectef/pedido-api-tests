# 🧪 Testes Automatizados da API de Pedidos - Projeto de Portfólio Pessoal


Projeto de testes automatizados desenvolvido com **Mocha**, **Chai** e **Supertest** para validar os endpoints da API de pedidos de restaurante.

---

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- API de Pedidos rodando localmente (exemplo: `http://localhost:3000`)

---

## ⚙️ Instalação e Estrutura do projeto

Clone o repositório (ou copie os arquivos para a sua máquina):

```bash
git clone https://github.com/conectef/pedido-api-tests
cd pedido-api-tests
npm install


pedido-api-tests/
├── test/
│   ├── consultar_id.test.js
│   ├── consultar.test.js
│   └── finalizar_pedido.test.js  ← Teste do endpoint /api/pedidos/:id/finalizar
│   ├── login.test.js
│   ├── pedidos.test.js
│   └── register.test.js
│
├── docs/
│   ├── Estratégia Organizacional
│   ├── Plano e Estratégia de teste
│   └── Plano de testes
│   └── Política de testes
│
├── erros/
│
├── .env                         ← Configuração do ambiente
├── package.json
├── README.md
├── .gitignore
└── mochawesome-report/           ← Relatórios de teste


