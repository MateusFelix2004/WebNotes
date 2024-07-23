const validator = require('validator'); // Importa o módulo validator

// Função para verificar se um email é válido
function validarEmail(email) {

    return validator.isEmail(email); // Usa o método isEmail do validator

}

// Função para verificar se um nome é válido
function validarNome(nome) {

    // Verifica se o nome não é nulo, não é undefined e não é uma string vazia
    return typeof nome === 'string' && nome.trim().length > 0;

}

// Função para verificar se um parâmetro é um número inteiro
function validarNumeroInteiro(numero) {

    // Verifica se o número é um valor inteiro
    return Number.isInteger(Number(numero));

}

module.exports = { validarEmail, validarNome, validarNumeroInteiro};