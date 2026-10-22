# Customer Manager

[![Demo](https://img.shields.io/badge/DEMO-ff00c8?style=for-the-badge&logo=render&logoColor=white)](https://customer-manager-4hiv.onrender.com/)

Aplicação web completa para gerenciamento de clientes, com operações CRUD (criar, listar, editar e excluir) e armazenamento em banco de dados SQLite.

> **Sobre a demo:** ela roda no plano gratuito do Render. O primeiro acesso pode levar alguns segundos para o servidor "acordar" e, como o disco desse plano é temporário, os clientes cadastrados na demo podem ser apagados a cada reinício ou novo deploy.

## Funcionalidades

- Cadastrar novos clientes (nome, e-mail, telefone, endereço)
- Listar todos os clientes cadastrados
- Editar dados de um cliente existente
- Excluir clientes
- Buscar clientes por nome ou e-mail em tempo real
- Validação no servidor: campos obrigatórios, formato de e-mail, tamanho máximo dos campos e `id` numérico

## Tecnologias

- **Front-end:** HTML5, CSS3, JavaScript puro
- **Back-end:** Node.js + Express
- **Banco de dados:** SQLite (via biblioteca `sqlite3`)

## Estrutura do projeto

```
customer-manager/
├── server.js          # Servidor Express e rotas da API
├── validation.js      # Validação dos dados recebidos
├── database.js        # Conexão e criação da tabela no SQLite
├── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Como rodar localmente

Esse projeto tem um back-end em Node.js, então precisa ser executado no terminal. Diferente de um site estático, não funciona só abrindo o HTML no navegador.

1. Tenha o [Node.js](https://nodejs.org) instalado no computador
2. Baixe ou clone este repositório
3. Abra o terminal na pasta do projeto e instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor:
   ```
   npm start
   ```
5. Abra o navegador em: `http://localhost:3000`

O banco de dados SQLite (`clientes.db`) é criado automaticamente na primeira execução, já com a tabela de clientes pronta.

## Endpoints da API

| Método | Rota                 | Descrição                     |
|--------|----------------------|-------------------------------|
| GET    | `/api/clientes`      | Lista todos os clientes       |
| GET    | `/api/clientes/:id`  | Busca um cliente específico   |
| POST   | `/api/clientes`      | Cria um novo cliente          |
| PUT    | `/api/clientes/:id`  | Atualiza um cliente existente |
| DELETE | `/api/clientes/:id`  | Remove um cliente             |

Dados inválidos retornam `400` com uma mensagem em `{ "error": "..." }`; clientes inexistentes retornam `404`.

## Próximos passos

- Migrar de SQLite para PostgreSQL, para os dados da demo não se perderem entre deploys
- Adicionar paginação na listagem de clientes
- Validar CPF e formatar telefone automaticamente
- Escrever testes automatizados para as rotas da API
