-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/07/2024 às 15:21
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbwebnotes`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `atualizarNomeEmailUsuario` (IN `p_id` INT, IN `p_nome` VARCHAR(255), IN `p_email` VARCHAR(255))   BEGIN
    UPDATE usuarios
    SET nome = p_nome,
        email = p_email
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `criarUsuario` (IN `p_nome` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_senha` VARCHAR(255), IN `p_data_criacao` DATE, IN `p_permissaoId` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback em caso de erro
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    
    INSERT INTO Usuarios (nome, email, senha, data_criacao, permissaoId)
    VALUES (p_nome, p_email, p_senha, p_data_criacao, p_permissaoId);

    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `detalharUsuario` (IN `p_id` INT)   BEGIN
    -- Seleciona o usuário com id, nome, email e data de criação com base no ID fornecido
    SELECT id AS id, 
           nome AS nome, 
           email AS email, 
           data_criacao AS registro
 -- Adiciona o campo data_criacao e renomeia para data
    FROM Usuarios
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `excluirNotas` (IN `p_usuarioId` INT)   BEGIN
    -- Remove todas as notas do usuário especificado
    DELETE FROM Notas WHERE usuarioId = p_usuarioId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `excluirNotasCompartilhadas` (IN `p_usuarioId` INT)   BEGIN
    -- Remove todas as notas compartilhadas para o usuário especificado
    DELETE FROM Notas_Compartilhadas WHERE usuarioId = p_usuarioId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `excluirUsuario` (IN `p_usuarioId` INT)   BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback em caso de erro
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Remove notas compartilhadas do usuário
    CALL excluirNotasCompartilhadas(p_usuarioId);

    -- Remove todas as notas do usuário
    CALL excluirNotas(p_usuarioId);

    -- Remove o usuário
    DELETE FROM Usuarios WHERE id = p_usuarioId;

    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obterNomeEmailUsuario` (IN `p_id` INT)   BEGIN
    SELECT nome, email
    FROM usuarios
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obterUsuarios` ()   BEGIN
    -- Seleciona todos os usuários com id, nome, email e data de criação
    SELECT id AS id, 
           nome AS nome, 
           email AS email, 
           data_criacao AS registro  -- Adiciona o campo data_criacao e renomeia para registro
    FROM Usuarios;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificaEmail` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT id, nome, senha, data_criacao AS registro
    FROM usuarios
    WHERE email COLLATE utf8mb4_bin = p_email COLLATE utf8mb4_bin;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `conteudo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `notas_compartilhadas`
--

CREATE TABLE `notas_compartilhadas` (
  `id` int(11) NOT NULL,
  `notaId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `permissaoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissoes`
--

CREATE TABLE `permissoes` (
  `id` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `permissoes`
--

INSERT INTO `permissoes` (`id`, `descricao`) VALUES
(1, 'Ler, criar e editar notas pessoais.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_criacao` date NOT NULL,
  `permissaoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Índices de tabela `notas_compartilhadas`
--
ALTER TABLE `notas_compartilhadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notaId` (`notaId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `permissaoId` (`permissaoId`);

--
-- Índices de tabela `permissoes`
--
ALTER TABLE `permissoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `permissaoId` (`permissaoId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `notas_compartilhadas`
--
ALTER TABLE `notas_compartilhadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `permissoes`
--
ALTER TABLE `permissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `notas_compartilhadas`
--
ALTER TABLE `notas_compartilhadas`
  ADD CONSTRAINT `notas_compartilhadas_ibfk_1` FOREIGN KEY (`notaId`) REFERENCES `notas` (`id`),
  ADD CONSTRAINT `notas_compartilhadas_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `notas_compartilhadas_ibfk_3` FOREIGN KEY (`permissaoId`) REFERENCES `permissoes` (`id`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`permissaoId`) REFERENCES `permissoes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
