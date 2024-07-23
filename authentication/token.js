const jwt = require('jsonwebtoken');  // Importa o módulo JSON Web Token para gerar e verificar tokens JWT

const secretWord = 'WebNotes@ProjectB1';  // Palavra secreta usada para gerar e verificar tokens JWT

// Função para gerar token JWT
function gerarToken(payload) {

  return jwt.sign(payload, secretWord, { expiresIn: '1h' });  // Gera um token com um payload e uma palavra secreta, expirando em 1 hora.

}

function verificarToken(req, res, next) {

  // Verifica se a requisição é um POST para a rota /usuarios
  // Se for, permite uma exceção para criação de um novo usuário quando não houver token.
  if (req.method === 'POST' && req.path === '/') {

    // Se for um POST para /usuarios, permite o acesso sem verificação de token
    return next();

  }
    
    // Se não for uma requisição POST para criação de um novo usuário, continua com a verificação de token

    // Obtém o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho de autorização está presente
    if (authHeader) {

      // Extrai o token do cabeçalho de autorização (remove o prefixo 'Bearer ')
      let token = authHeader.replace('Bearer ', '');

      if(token){


      // Verifica o token usando a chave secreta
      jwt.verify(token, secretWord, (error, decoded) => {

        if (error) {

          // Se o erro for de token expirado, retorna uma resposta com status 401 e mensagem apropriada
          if (error.name === 'TokenExpiredError') {

            return res.status(401).json({ mensagemErro: 'Token expirado. Faça login novamente.' });

          } else {

            // Para outros erros de verificação de token, retorna uma resposta com status 401 e mensagem apropriada
            return res.status(401).json({ mensagemErro: 'Token inválido. Faça login novamente.' });

          }
          
        } else {

          // Se o token for válido, adiciona as informações do usuário à requisição
          req.usuario = { id: decoded.id, nome: decoded.nome };
          return next();  // Passa para o próximo middleware ou rota

        }
      });

      }

    } else {

      // Se o cabeçalho de autorização não estiver presente, retorna uma resposta com status 401
      return res.status(401).json({ mensagemErro: 'Token não detectado. Faça login.' });
      
    }

  }

module.exports = { 
  
  verificarToken,
  gerarToken

};
