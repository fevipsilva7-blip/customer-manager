vconst express = require('express');
const path = require('path');
const db = require('./database');
const { validarCliente, validarId } = require('./validation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Registra o erro real no servidor e devolve uma mensagem genérica ao cliente,
// para não expor detalhes internos do banco de dados.
function erroInterno(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
}

// CREATE - Adicionar novo cliente
app.post('/api/clientes', (req, res) => {
  const { cliente, erro } = validarCliente(req.body);
  if (erro) {
    return res.status(400).json({ error: erro });
  }

  const sql = `INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)`;
  db.run(sql, [cliente.nome, cliente.email, cliente.telefone, cliente.endereco], function (err) {
    if (err) {
      return erroInterno(res, err);
    }
    res.status(201).json({ id: this.lastID, ...cliente });
  });
});

// READ - Listar todos os clientes
app.get('/api/clientes', (req, res) => {
  const sql = `SELECT * FROM clientes ORDER BY criado_em DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return erroInterno(res, err);
    }
    res.json(rows);
  });
});

// READ - Buscar um cliente pelo id
app.get('/api/clientes/:id', (req, res) => {
  const id = validarId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const sql = `SELECT * FROM clientes WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return erroInterno(res, err);
    }
    if (!row) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json(row);
  });
});

// UPDATE - Atualizar cliente existente
app.put('/api/clientes/:id', (req, res) => {
  const id = validarId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const { cliente, erro } = validarCliente(req.body);
  if (erro) {
    return res.status(400).json({ error: erro });
  }

  const sql = `UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?`;
  db.run(sql, [cliente.nome, cliente.email, cliente.telefone, cliente.endereco, id], function (err) {
    if (err) {
      return erroInterno(res, err);
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json({ id, ...cliente });
  });
});

// DELETE - Remover cliente
app.delete('/api/clientes/:id', (req, res) => {
  const id = validarId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const sql = `DELETE FROM clientes WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return erroInterno(res, err);
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(204).send();
  });
});

// Tratamento final de erros (ex.: JSON malformado no corpo da requisição)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Corpo da requisição grande demais.' });
  }
  erroInterno(res, err);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
