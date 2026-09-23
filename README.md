#  Sistema de Cadastro de Clientes
🔗 **[Acesse o projeto online](https://customer-manager-4hiv.onrender.com/)**


Aplicação web completa para gerenciamento de clientes, com operações CRUD (Criar, Ler, Atualizar, Excluir) e armazenamento em banco de dados SQLite.

##  Funcionalidades

- Cadastrar novos clientes (nome, e-mail, telefone, endereço)
- Listar todos os clientes cadastrados
- Editar dados de um cliente existente
- Excluir clientes
- Buscar clientes por nome ou e-mail em tempo real

##  Tecnologias

- **Front-end:** HTML5, CSS3, JavaScript puro
- **Back-end:** Node.js + Express
- **Banco de dados:** SQLite (via biblioteca `sqlite3`)

##  Estrutura do projeto

```
sistema-cadastro-clientes/
├── server.js          # Servidor Express e rotas da API
├── database.js        # Conexão e criação da tabela no SQLite
├── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

##  Como rodar localmente

Esse projeto tem um back-end em Node.js, então precisa ser executado no terminal — diferente de um site estático, não funciona só abrindo o HTML no navegador.

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

## 🔌 Endpoints da API

| Método | Rota                 | Descrição                     |
|--------|----------------------|--------------------------------|
| GET    | `/api/clientes`      | Lista todos os clientes        |
| GET    | `/api/clientes/:id`  | Busca um cliente específico    |
| POST   | `/api/clientes`      | Cria um novo cliente           |
| PUT    | `/api/clientes/:id`  | Atualiza um cliente existente  |
| DELETE | `/api/clientes/:id`  | Remove um cliente              |

##  Personalizando

- Adicione mais campos (ex: CPF, data de nascimento) editando `database.js`, `server.js` e o formulário em `public/index.html`
- As cores do tema ficam centralizadas no topo do `style.css`, dentro de `:root`

##  Ideias para evoluir

- Adicionar paginação na listagem de clientes
- Validar CPF e formatar telefone automaticamente
- Publicar online usando serviços como Render ou Railway, que suportam Node.js e SQLite gratuitamente
