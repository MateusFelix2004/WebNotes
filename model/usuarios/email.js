const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.

// Função para verificar no banco de dados se um email já existe
function verificaEmailBD(email) {
    return new Promise((resolve, reject) => {
        // Inicia a consulta para obter um usuário a partir de um email (email existe)
        dbconn.query('CALL verificaEmail(?)', [email], (error, results) => {
            if (error) {
                // Se houver um erro na execução da consulta SQL
                console.log('Erro ao processar o comando SQL: ', error.message); // Loga o erro para diagnóstico.
                return reject(new Error('Erro ao processar o comando SQL.')); // Rejeita a promessa com uma mensagem de erro.
            } else if (results[0].length > 0) {
                // Se a consulta SQL for bem-sucedida e houver um resultado (email já existe)
                return resolve(true); // Resolve a promessa indicando que o email já é utilizado.
            } else {
                // Se a consulta SQL for bem-sucedida e não houver um resultado (email livre)
                return resolve(false); // Resolve a promessa indicando que o email está livre.
            }
        });
    });
}

module.exports = { verificaEmailBD };
