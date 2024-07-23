const { modeloUsuario } = require('../../model/models.js') // Importa o modelo de usuário.

const { validarNumeroInteiro } = require('../../utils/validacoes.js'); // Importa o módulo de validação de número inteiro.

// Função responsável por realizar a exclusão de um usuário
async function excluirUsuario(req, res){

    const id = req.params.id;  // Obtém do corpo da requisição o ID do usuário a ser excluído

        // Se o ID passado for válido (é número inteiro)
        if(validarNumeroInteiro(id)){

            const reusltadoExclusao = await modeloUsuario.deletarUsuario(id);

            // Se o usuário for excluído com sucesso
            if(reusltadoExclusao){

                return res.status(200).json({ mensagemInfo: 'Usuário excluído com sucesso.' });

            } else {

                // Se ocorrer uma falha na exclusão
                return res.status(404).json({ mensagemErro: 'Recurso não encontrado.' });

            }

        } else {

            // Se o ID passado for inválido (não é número inteiro)
            return res.status(400).json({ mensagemErro: 'Requisição inválida.' });

        }
        

}

module.exports = { excluirUsuario }