// Função para obter a data atual no formato "aaaa-mm-dd"
function obterDataAtual() {

    const dataAtual = new Date(); // Obtém a data atual

    const ano = dataAtual.getFullYear(); // Obtém o ano com 4 dígitos
    let mes = dataAtual.getMonth() + 1; // Obtém o mês (Janeiro é 0, então adicionamos 1)
    let dia = dataAtual.getDate(); // Obtém o dia do mês

    // Adiciona um zero à esquerda se o mês ou o dia tiverem um dígito
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    return `${ano}-${mes}-${dia}`; // Retorna a data formatada como "aaaa/mm/dd"

}

module.exports = { obterDataAtual }