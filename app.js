const express = require('express');  // Importa o módulo Express para criar o servidor web

const { routerUsuarios } = require('./routers/usuarios.js');  // Importa as rotas relacionadas a usuarios

const { routerLogin } = require('./routers/login.js');  // Importa as rotas relacionadas a login

const{ verificarToken } = require('./authentication/token.js');  // Importa o módulo de verificação de token

const cors = require('cors'); // Importa o módulo CORS para permitir controle de acesso entre diferentes origens

const bodyParser = require('body-parser');  // Importa o middleware body-parser para processar o corpo das requisições

const app = express();  // Cria uma instância do Express

app.use(cors()); // Configura o middleware CORS

app.use(bodyParser.json());  // Middleware para processar JSON no corpo das requisições

// Define as rotas para usuarios, protegidas pelo middleware de verificação de token
app.use('/usuarios', verificarToken, routerUsuarios);

// Define as rotas para login
app.use('/login', routerLogin);

// Inicia o servidor web na porta 3000
app.listen(3000, () => {

  console.log(`Servidor web iniciado na porta 3000`);

});
