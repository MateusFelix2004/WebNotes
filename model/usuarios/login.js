const dbconn = require('../../configurations/database.js'); // Importa o módulo de conexão com o banco de dados.

// Função responsável por obter os dados de login do usuário a partir do email.
// Se o email estiver em um registro de usuário, retorna o hash da senha, data de criação (registro) e o ID.
function obterLoginUsuario(email) {
    return new Promise((resolve, reject) => {
        dbconn.query('CALL verificaEmail(?)', [email], (error, rows) => {
            if (error) {
                // Se houver um erro na consulta ao banco de dados
                console.log('Erro ao processar o comando SQL. ', error.message);
                return reject(error); // Rejeita a promessa em caso de erro
            } else {
                console.log('Resultado da consulta: ', rows);
                if (rows.length > 0) {
                    // Se a consulta for bem-sucedida e houver resultados
                    const resultado = rows[0][0]; // Assume que a consulta retorna uma lista com um único resultado
                    console.log('Usuário encontrado: ', resultado);
                    return resolve(resultado); // Resolve a promessa com os dados do usuário
                } else {
                    // Se a consulta for bem-sucedida mas não houver resultados
                    return resolve(false); // Resolve a promessa com null indicando que o usuário não foi encontrado
                }
            }
        });
    });
}

module.exports = { obterLoginUsuario };
