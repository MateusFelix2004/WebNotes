const { obterLoginUsuario } = require('../../model/usuarios/login.js'); // Importa o módulo que obtem as informações necessárias para validar as credenciais
const { gerarHashSenha } = require('../../utils/senha.js'); // Importa o módulo que gera um hash da senha a partir do texto simples e um salt
const { gerarToken } = require('../../authentication/token.js'); // Importa o módulo que gera um token JWT

// Função que realiza a autenticação de um usuário para login
async function loginUsuario(req, res) {
    const email = req.body.email; // Obtém o email do corpo da requisição.
    const senha = req.body.senha;  // Obtém a senha do corpo da requisição.

    if (!email || !senha) {
        return res.status(400).json({ mensagemErro: 'Email e senha são obrigatórios.' });
    }

    try {
        const usuario = await obterLoginUsuario(email);

        // Se o resultado retornado pelo modelo não for 'null' e nem 'false'
        if (usuario != null && usuario != false) {
            // Se houver um usuário com o email consultado
            let hash = usuario.senha; //obtém a hash da senha armazenada
            let saltSenha = new Date(usuario.registro).toISOString().split('T')[0]; // Formata a data para 'YYYY-MM-DD'

            console.log(`Salt usado: ${saltSenha}`);
            let senhaHashada = gerarHashSenha(senha, saltSenha); // obtém uma hash gerada a partir da senha utilizada na tentativa de login e salt
            console.log(`Senha hashada: ${senhaHashada}`);
            console.log(`Hash esperada: ${hash}`);

            // Se a senha usada para tentar login coincidir com a hash
            if (senhaHashada === hash) {
                const payload = {
                    id: usuario.id, // ID do usuário
                    nome: usuario.nome, // Nome do usuário
                    registro: usuario.registro // Data de criação do usuário
                };

                const token = gerarToken(payload); // Obtém um token para o usuário com expiração em 1 hora

                // Devolve o token ao cliente
                return res.status(200).json({ token: token });
            } else {
                // Se a senha não coincidir
                return res.status(401).json({ mensagemErro: 'Usuário ou senha incorretos.' });
            }
        } else if (usuario == false) {
            // Se não houver nenhum usuário com o email utilizado para tentar login
            return res.status(401).json({ mensagemErro: 'Usuário ou senha incorretos.' });
        } else {
            // Erro na consulta ao banco de dados ('null')
            return res.status(500).json({ mensagemErro: 'Erro interno do servidor. Tente novamente mais tarde.' });
        }
    } catch (error) {
        console.error('Erro ao processar login: ', error.message);
        return res.status(500).json({ mensagemErro: 'Erro interno do servidor.' });
    }
}

module.exports = { loginUsuario };
