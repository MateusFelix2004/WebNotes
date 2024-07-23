// Importação de módulos do controlador de usuário.
const { registrarUsuario } = require('./usuario/criar.js'); // Importa o módulo que cria um novo usuário no sistema.

const { excluirUsuario } = require('./usuario/deletar.js'); // Importa o módulo que deleta um usuário.

const { detalhesUsuario } = require('./usuario/detalhar.js'); // Importa o módulo que obtém informações de um usuário específico.

const { editarUsuario } = require('./usuario/editar.js');

const { listaUsuarios } = require('./usuario/listar.js'); // Importa o módula que lista todos os usuários.

const { loginUsuario } = require('./usuario/login.js'); // Importa o módulo que realiza de login.

// Centraliza os módulos do controlador de usuário
const controllerUsuario = {

    registrarUsuario,
    excluirUsuario,
    editarUsuario,
    detalhesUsuario,
    listaUsuarios,
    loginUsuario

}

module.exports = { controllerUsuario }