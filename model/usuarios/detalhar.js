const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.

// Função para obter detalhes de um usuário específico
function detalharUsuario(id) {

  return new Promise((resolve, reject) => {

    dbconn.query('CALL detalharUsuario(?)', [id], (error, rows) => {

      if (error) {

        // Se houver um erro na consulta ao banco de dados
        console.log('Erro ao processar o comando SQL. ', error.message);
        return reject(error); // Rejeita a promessa em caso de erro

      } else if (rows[0].length > 0) {

        // Se a consulta for bem-sucedida e houver resultado da busca
        const resultado = rows[0][0]; // O resultado geralmente é um array de resultados; você pode precisar acessar o primeiro item
       
        console.log("resultado detalhar BD" + rows)
       
        return resolve(resultado); // Resolve a promessa com o resultado

      } else {

        // Se a consulta for bem-sucedida e não houver resultado da busca
        return resolve(false); // Resolve a promessa com null se não houver resultado

      }
    });
  });
}

module.exports = { detalharUsuario };

