const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.

// Função para verificar se um usuário existe
function verificarUsuarioExistente(id) {
  return new Promise((resolve, reject) => {
    dbconn.query('SELECT COUNT(*) AS count FROM usuarios WHERE id = ?', [id], (error, result) => {
      if (error) {
        console.log('Erro ao verificar o usuário: ', error.message);
        return reject(error); // Rejeita a promessa em caso de erro
      }

      const count = result[0].count;
      resolve(count > 0); // Resolve com true se o usuário existir, caso contrário false
    });
  });
}

// Função para excluir um usuário existente
function deletarUsuario(id) {
  return new Promise((resolve, reject) => {
    verificarUsuarioExistente(id)
      .then(existe => {
        if (existe) {
          // Se o usuário existir, proceder com a exclusão
          dbconn.query('CALL excluirUsuario(?)', [id], (error, rows) => {
            if (error) {
              // Se houver um erro na consulta ao banco de dados
              console.log('Erro ao processar o comando SQL. ', error.message);
              return reject(error); // Rejeita a promessa em caso de erro
            }

            // Se a exclusão for bem-sucedida
            resolve(true); // Resolve a promessa com sucesso
          });
        } else {
          // Se o usuário não existir
          resolve(false); // Resolve a promessa indicando que o usuário não foi encontrado
        }
      })
      .catch(error => {
        console.log('Erro ao verificar a existência do usuário: ', error.message);
        reject(error); // Rejeita a promessa em caso de erro na verificação
      });
  });
}

module.exports = { deletarUsuario };
