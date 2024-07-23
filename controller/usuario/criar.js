const { validarEmail, validarNome } = require('../../utils/validacoes.js'); // Importa o módulo de validação de email e nome.

const { modeloUsuario } = require('../../model/models.js'); // Importa o modelo de usuário

const { verificaEmailBD } = require('../../model/usuarios/email.js');

// Função que cria um novo usuário no sistema
async function registrarUsuario(req, res){

  const nome = req.body.nome;  // Obtém o nome do corpo da requisição.
  const email = req.body.email; // Obtém o email do corpo da requisição.
  const senha = req.body.senha;  // Obtém o nome de login do corpo da requisição.

  // Faz a validação do nome (não pode estar vazio)
  if(validarNome(nome)){

    // Faz a validação do email
    if(validarEmail(email)){

      const verificacaoEmail = await verificaEmailBD(email);

      if(verificacaoEmail == false){
        // Se o email está livre (false)
        console.log(`email false: ${verificacaoEmail}`)
        
        const criarUsuario = await modeloUsuario.criarUsuario(nome, email, senha);

        // Se o usuário for criado com sucesso pelo model
        if(criarUsuario){

          return res.status(201).json({ mensagem: 'Usuário criado com sucesso.' });

        } else{

          // Se usuário não for criado com sucesso pelo model
          return res.status(409).json({ mensagemErro: 'Usuário não criado devido a conflitos.' });

        }

      } else if(verificacaoEmail == true) {

        // se o email está sendo utilizado por outro usuário
        console.log(`email true : ${verificacaoEmail}`);
        return res.status(409).json({ mensagemInfo: ' email Usuário não criado devido a conflitos.' });

      } else {

        console.log(`email erro : ${verificacaoEmail}`)

        // Se ocorrer um erro na consulta ('null')
        return res.status(500).json({ mensagemErro: 'Erro interno do servidor. Tente novamente mais tarde.' });

      }
        
    } else {

      // Se o email for inválido
      return res.status(400).json({ mensagemErro: 'O email fornecido é inválido.' });

    }

  } else {
    
    // Se o nome for inválido
    return res.status(400).json({ mensagemErro: 'O nome não pode ser vazio.' });

  }
  
}

module.exports = { registrarUsuario }