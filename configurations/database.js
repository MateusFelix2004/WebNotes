const mysql = require('mysql');

// Cria uma conexão com o banco de dados
const dbconn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'dbwebnotes'  // O nome do banco de dados a ser usado
});

// Estabelece a conexão com o banco de dados
dbconn.connect((err) => {
    if (err) {  
        // Se houver um erro ao conectar
        console.log(err);
    } else {  
        // Se a conexão for bem-sucedida
        console.log('Conectado com sucesso ao banco de dados');
    }
});

module.exports = dbconn;  // Exporta a conexão do banco de dados para ser usada em outros módulos
