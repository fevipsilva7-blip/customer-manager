const form = document.getElementById('cliente-form');
const idField = document.getElementById('cliente-id');
const nomeField = document.getElementById('nome');
const emailField = document.getElementById('email');
const telefoneField = document.getElementById('telefone');
const enderecoField = document.getElementById('endereco');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const tableBody = document.getElementById('clientes-body');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');

let clientes = [];

async function fetchClientes() {
  const res = await fetch('/api/clientes');
  clientes = await res.json();
  renderTable(clientes);
}

function renderTable(lista) {
  tableBody.innerHTML = '';

  if (lista.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  lista.forEach(cliente => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${escapeHtml(cliente.nome)}</td>
      <td>${escapeHtml(cliente.email)}</td>
      <td>${escapeHtml(cliente.telefone || '-')}</td>
      <td>${escapeHtml(cliente.endereco || '-')}</td>
      <td class="actions-cell">
        <button class="btn-edit" data-id="${cliente.id}">Editar</button>
        <button class="btn-delete" data-id="${cliente.id}">Excluir</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  tableBody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => startEdit(Number(btn.dataset.id)));
  });

  tableBody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteCliente(Number(btn.dataset.id)));
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function startEdit(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  idField.value = cliente.id;
  nomeField.value = cliente.nome;
  emailField.value = cliente.email;
  telefoneField.value = cliente.telefone || '';
  enderecoField.value = cliente.endereco || '';

  formTitle.textContent = 'Editar Cliente';
  submitBtn.textContent = 'Atualizar Cliente';
  cancelBtn.classList.remove('hidden');
  nomeField.focus();
}

function resetForm() {
  form.reset();
  idField.value = '';
  formTitle.textContent = 'Novo Cliente';
  submitBtn.textContent = 'Salvar Cliente';
  cancelBtn.classList.add('hidden');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    nome: nomeField.value.trim(),
    email: emailField.value.trim(),
    telefone: telefoneField.value.trim(),
    endereco: enderecoField.value.trim()
  };

  const id = idField.value;
  const url = id ? `/api/clientes/${id}` : '/api/clientes';
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.json();
    alert(error.error || 'Erro ao salvar cliente.');
    return;
  }

  resetForm();
  fetchClientes();
});

cancelBtn.addEventListener('click', resetForm);

async function deleteCliente(id) {
  if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

  const res = await fetch(`/api/clientes/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    alert('Erro ao excluir cliente.');
    return;
  }

  fetchClientes();
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

fetchClientes();
