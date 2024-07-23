const { modeloUsuario } = require('../../model/models.js') // Importa o modelo de usuário

const { validarEmail, validarNome, validarNumeroInteiro } = require('../../utils/validacoes.js'); // Importa o módulo de validação de email e nome.

const { verificaEmailBD } = require('../../model/usuarios/email.js');

// Função que edita o nome e email de um usuário
async function editarUsuario(req, res){

    const id = req.params.id // Obtém a ID do usuário alvo da edição no cropo da requisição
    const nome = req.body.nome; // Obtém o novo nome na requisição
    const email = req.body.email; // Obtém o novo email na requisição

    // Se o ID passado for válido (é número inteiro)
    if(validarNumeroInteiro(id)){

        // Faz a validação do nome (não pode estar vazio)
        if(validarNome(nome)){

            // Faz a validação do email
            if(validarEmail(email)){

                const verificacaoEmail = await verificaEmailBD(email);

                if(verificacaoEmail == false){
                    
                    const resultadoEdicao = await modeloUsuario.atualizarUsuario(id, nome, email);

                    if(resultadoEdicao){

                        // Se os dados forem atulizados com sucesso
                        return res.status(200).json({ mensagemInfo: 'Os dados do usuário foram atualizados.' });

                    } else {

                        // Se ocorrer um erro na atualização
                        return res.status(500).json({ mensagemErro: 'Erro interno do servidor. Tente novamente mais tarde.' });

                    }

                } else {

                    return res.status(409).json({ mensagemErro: 'Usuário não atualizado devido a conflitos.' });

                }

            } else {

                // Se o email for inválido
                return res.status(400).json({ mensagemErro: 'O email fornecido é inválido.' });

            }

        } else {
            
            // Se o nome for inválido
            return res.status(400).json({ mensagemErro: 'O nome não pode ser vazio.' });

        }
    
    } else {

        // Se o ID passado for inválido (não é número inteiro)
        return res.status(400).json({ mensagemErro: 'Requisição inválida.' });

    }
  
}

module.exports = { editarUsuario }