
// Função para gerar o hash de uma senha com um salt
function gerarHashSenha(senha, salt){

    const crypto = require('crypto');

    // Dados a serem hashados
    const dados = senha + salt;
    
    // Cria um objeto hash com o algoritmo SHA-256
    const hash = crypto.createHash('sha256');
    
    // Atualiza o hash com os dados
    hash.update(dados);
    
    // Gera o hash em formato hexadecimal
    const hashedDados = hash.digest('hex');

    return hashedDados;

}

module.exports = { gerarHashSenha }