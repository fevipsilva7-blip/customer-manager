const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CREATE - Adicionar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone, endereco } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  const sql = `INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nome, email, telefone, endereco], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, nome, email, telefone, endereco });
  });
});

// READ - Listar todos os clientes
app.get('/api/clientes', (req, res) => {
  const sql = `SELECT * FROM clientes ORDER BY criado_em DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// READ - Buscar um cliente pelo id
app.get('/api/clientes/:id', (req, res) => {
  const sql = `SELECT * FROM clientes WHERE id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json(row);
  });
});

// UPDATE - Atualizar cliente existente
app.put('/api/clientes/:id', (req, res) => {
  const { nome, email, telefone, endereco } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  const sql = `UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?`;
  db.run(sql, [nome, email, telefone, endereco, req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json({ id: Number(req.params.id), nome, email, telefone, endereco });
  });
});

// DELETE - Remover cliente
app.delete('/api/clientes/:id', (req, res) => {
  const sql = `DELETE FROM clientes WHERE id = ?`;
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
