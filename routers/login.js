const express = require('express'); // Importa o módulo 'express' para criar o aplicativo web.

const routerLogin = express.Router(); // Cria um roteador para gerenciar as rotas relacionadas ao recurso 'Login'.

const { controllerUsuario } = require('../controller/controllers.js'); // Importa o controlador de usuário.

// Rota para login, que gera um token JWT para o usuário
routerLogin.post('/', (req, res) => {

    controllerUsuario.loginUsuario(req, res); // Invoca o controlador de usuário para login
  
  });

  module.exports = { routerLogin }