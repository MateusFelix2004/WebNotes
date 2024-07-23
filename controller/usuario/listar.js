const { modeloUsuario } = require('../../model/models.js') // Importa o modelo de usuário

// Função responsável por devolver informações de todos os usuários
// Informações a serem devolvidas: id, nome e registro (data de criação).
async function listaUsuarios(req, res){

    const resultadoBusca = await modeloUsuario.listarUsuarios(); // Consulta todos os usuários

   // Se o resultado retornado pelo modelo não for 'null' e nem 'false'
   // onde 'null' = ocorreu um erro na consulta e 'false' = não existe um usuário com a ID.
   // Não sendo nem um desses, significa que o ID deu match em algum usuário.
   if(resultadoBusca != null && resultadoBusca != false){

        // Retorna os detalhes dos usuários
        return res.status(200).json({ resultadoBusca });   
    
    } else if(resultadoBusca == false) {
    
        // Se se a consulta for bem-sucedida e não houver resultados
        return res.status(404).json({ mensagemInfo: 'Usuários não encontrados.' });
    
    } else {
    
        // Erro na consulta ao banco de dados ('null')
        return res.status(500).json({ mensagemErro: 'Erro interno do servidor. Tente novamente mais tarde.' })
    
    }

} 

module.exports = { listaUsuarios }