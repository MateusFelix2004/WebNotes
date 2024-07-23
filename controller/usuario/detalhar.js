const { modeloUsuario } = require('../../model/models.js'); // Importa os módulo do modelo de usuário;

const { validarNumeroInteiro } = require('../../utils/validacoes.js'); // Importa o módulo de validação de número inteiro.

// Função responsável por devolver informações de um usuário específico.
// Informações a serem devolvidas: id, nome e registro (data de criação).
async function detalhesUsuario(req, res){

    const idDetalhar = req.params.id; // Obtém a id do usuário a obter detalhes
    
    // Se a ID for válida (é um número inteiro)
    if(validarNumeroInteiro(idDetalhar)){

        let usuario = await modeloUsuario.detalharUsuario(idDetalhar);

        // Se o resultado retornado pelo modelo não for 'null' e nem 'false'
        // onde 'null' = ocorreu um erro na consulta e 'false' = não existe um usuário com a ID.
        // Não sendo nem um desses, significa que o ID deu match em algum usuário.
        if(usuario != null && usuario != false){
    
            // Se houver um usuário com o ID consultado
            // Retorna os detalhes do usuário consultado
            return res.status(200).json( usuario );   
    
        } else if(usuario == false) {
    
            // Se não houver um usuário com o ID consultado
            return res.status(404).json({ mensagemInfo: 'Usuário não encontrado.' });
    
        } else {
    
            // Erro na consulta ao banco de dados ('null')
            return res.status(500).json({ mensagemErro: 'Erro interno do servidor. Tente novamente mais tarde.' })
    
        }

    } else {

        // Se o ID passado for inválido (não é número inteiro)
        return res.status(400).json({ mensagemErro: 'Requisição inválida.' });

    }
    
}

module.exports = { detalhesUsuario }