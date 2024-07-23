const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.


// Função para listar todos os usuários
function listarUsuarios() {

  return new Promise((resolve, reject) => {

    dbconn.query('CALL obterUsuarios()', (error, rows) => {

      if (error) {

        // Se houver um erro na consulta ao banco de dados
        console.log('Erro ao processar o comando SQL. ', error.message);
        return reject(error); // Rejeita a promessa em caso de erro

      } else {

        if (rows.length > 0) {

          // Se a consulta for bem-sucedida e houver resultados
          let resultados = rows[0];
          return resolve(resultados); // Resolve a promessa com os resultados

        } else {

          // Se a consulta for bem-sucedida mas não houver resultados
          return resolve(false); 

        }

      }

    });

  });

}

module.exports = { listarUsuarios };
