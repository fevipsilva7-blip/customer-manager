#  Customer Manager

> Aplicação full stack para gerenciar clientes, com CRUD completo, API REST em Node.js/Express e banco de dados SQLite.

[![Demo](https://img.shields.io/badge/Demo-ao%20vivo-00C2B8?style=for-the-badge&logo=render&logoColor=white)](https://customer-manager-4hiv.onrender.com/)
![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-007BFF?style=for-the-badge)

<!-- Quando tiver um print ou GIF, salve em docs/preview.png e descomente a linha abaixo:
![Preview do Customer Manager](docs/preview.png)
-->

> **Sobre a demo:** ela roda no plano gratuito do Render. O primeiro acesso pode levar alguns segundos para o servidor "acordar" e, como o disco desse plano é temporário, os clientes cadastrados na demo podem ser apagados a cada reinício ou novo deploy.

---

##  Sobre o projeto

Projeto criado para praticar o ciclo completo de uma aplicação web: interface em JavaScript puro, API REST com Express, validação de dados no servidor e persistência em banco de dados relacional.

###  Funcionalidades

- Cadastrar clientes (nome, e-mail, telefone, endereço)
- Listar todos os clientes cadastrados
- Editar dados de um cliente existente
- Excluir clientes
- Buscar por nome ou e-mail em tempo real
- Validação no servidor: campos obrigatórios, formato de e-mail, tamanho máximo dos campos e `id` numérico

---

## 🛠️ Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black)

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript puro |
| Back-end | Node.js + Express |
| Banco de dados | SQLite (biblioteca `sqlite3`) |
| Deploy | Render (plano gratuito) |

---

##  Como rodar localmente

Este projeto tem um back-end em Node.js, então precisa ser executado pelo terminal. Diferente de um site estático, não funciona só abrindo o HTML no navegador.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Git](https://git-scm.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/fevipsilva7-blip/customer-manager.git

# 2. Entre na pasta
cd customer-manager

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm start
```

Acesse **http://localhost:3000** no navegador.

> O banco de dados SQLite (`clientes.db`) é criado automaticamente na primeira execução, já com a tabela de clientes pronta. Não precisa instalar nem configurar nada além do Node.js.

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/:id` | Busca um cliente específico |
| POST | `/api/clientes` | Cria um novo cliente |
| PUT | `/api/clientes/:id` | Atualiza um cliente existente |
| DELETE | `/api/clientes/:id` | Remove um cliente |

**Respostas de erro:** dados inválidos retornam `400` com `{ "error": "..." }`; clientes inexistentes retornam `404`.

---

##  Estrutura de pastas

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

---

##  Próximos passos

- [ ] Migrar de SQLite para PostgreSQL, para os dados da demo não se perderem entre deploys
- [ ] Adicionar paginação na listagem de clientes
- [ ] Validar CPF e formatar telefone automaticamente
- [ ] Escrever testes automatizados para as rotas da API

---

##  Autor

**Felipe Rodrigues**
[LinkedIn](https://www.linkedin.com/in/felipe-rodrigues-da-silvaa) · [Portfólio](https://portfolio-site-five-jet-79.vercel.app/) · [GitHub](https://github.com/fevipsilva7-blip)
