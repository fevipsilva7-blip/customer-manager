// Validação de entrada da API de clientes.
// Fica separada do server.js para ser fácil de ler e de testar.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITES = { nome: 120, email: 254, telefone: 30, endereco: 255 };

function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

// Retorna { cliente } com os dados limpos ou { erro } com a mensagem para o usuário.
function validarCliente(body) {
  const dados = body && typeof body === 'object' ? body : {};

  for (const campo of Object.keys(LIMITES)) {
    const valor = dados[campo];
    if (valor !== undefined && valor !== null && typeof valor !== 'string') {
      return { erro: `O campo ${campo} deve ser um texto.` };
    }
  }

  const cliente = {
    nome: texto(dados.nome),
    email: texto(dados.email),
    telefone: texto(dados.telefone),
    endereco: texto(dados.endereco),
  };

  if (!cliente.nome || !cliente.email) {
    return { erro: 'Nome e e-mail são obrigatórios.' };
  }

  if (!EMAIL_REGEX.test(cliente.email)) {
    return { erro: 'Informe um e-mail válido.' };
  }

  for (const [campo, maximo] of Object.entries(LIMITES)) {
    if (cliente[campo].length > maximo) {
      return { erro: `O campo ${campo} deve ter no máximo ${maximo} caracteres.` };
    }
  }

  return { cliente };
}

// Converte o :id da rota em número inteiro positivo, ou null se for inválido.
function validarId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

module.exports = { validarCliente, validarId };
