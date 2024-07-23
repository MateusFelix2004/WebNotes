// Importação de módulos do modelo de usuário.
const { criarUsuario } = require('./usuarios/criar.js'); // Importa o módulo que cria um novo usuário no sistema.

const { deletarUsuario } = require('./usuarios/deletar.js'); // Importa o módulo que deleta um usuário.

const { atualizarUsuario } = require('./usuarios/editar.js'); // Importa o módulo que deleta um usuário.

const { detalharUsuario } = require('./usuarios/detalhar.js'); // Importa o módulo que obtém informações de um usuário específico.

const { listarUsuarios } = require('./usuarios/listar.js'); // Importa o módula que lista todos os usuários.

const { obterLoginUsuario } = require('./usuarios/login.js'); // Importa o módulo que realiza de login.

const { verificaEmailBD } = require('./usuarios/email.js'); // Importa o módulo qeu verifica a existencia de um email no banco de dados

// Centraliza os módulos do modelo de usuário
const modeloUsuario = {

    criarUsuario,
    deletarUsuario,
    atualizarUsuario,
    detalharUsuario,
    listarUsuarios,
    obterLoginUsuario,
    verificaEmailBD

}

module.exports = { modeloUsuario }