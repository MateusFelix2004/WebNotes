const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.

const { gerarHashSenha } = require('../../utils/senha.js'); // Importa o módulo de geração de hash com salt.

const { obterDataAtual } = require('../../utils/data.js'); // Importa o módulo que obtém a data atual.

function criarUsuario(nome, email, senha) {
  return new Promise((resolve, reject) => {
    let dataAtual = obterDataAtual(); // Obtém a data atual para associar ao registro do usuário.
    let hashSenha = gerarHashSenha(senha, dataAtual); // Gera o hash da senha usando o método de hashing com salt.
    let permissao = 1; // Define o nível de permissão do usuário. Valor fixo para leitura, criação e edição.

    // Executa a consulta SQL para criar um novo usuário no banco de dados
    dbconn.query('CALL criarUsuario(?, ?, ?, ?, ?)', [nome, email, hashSenha, dataAtual, permissao], (error, results) => {
      if (error) {
        // Se houver um erro na execução da consulta SQL
        console.error('Erro ao processar o comando SQL: ', error.message); // Loga o erro para diagnóstico.
        return reject(false); // Rejeita a promessa indicando que a operação falhou.
      }

      // Se a consulta SQL for bem-sucedida
      return resolve(true); // Resolve a promessa indicando que o usuário foi criado com sucesso.
    });
  });
}

module.exports = { criarUsuario };