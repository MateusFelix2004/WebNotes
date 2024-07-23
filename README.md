
# WebNotes

Para executar a aplicação, siga os passos abaixo:

1. No PHPMyAdmin, selecione a opção de criar um novo banco de dados.
2. Na parte superior, selecione o menu de edição de código SQL.
3. Execute o seguinte código SQL:

    ```sql
    CREATE DATABASE dbwebnotes
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
    ```

4. Selecione o banco de dados "dbWebNotes".
5. Na parte superior, selecione a opção de importar.
6. Escolha o arquivo "dbwebnotes.sql", localizado na pasta "configurations" dentro da pasta da aplicação.
7. Clique em "executar" para iniciar a criação da estrutura do banco de dados.

Após isso, na IDE que será utilizada:

1. Abra o terminal.
2. Navegue até o diretório da aplicação.
3. Execute o comando `npm install` para realizar a instalação das dependências.

Para iniciar a execução da API:

1. No terminal, após executar todos os passos anteriores, execute o comando `node app.js`.

# Documentação da API

## Criar Usuário

- **ENDPOINT:** `/usuarios`
- **TIPO DE REQUISIÇÃO:** POST

### Exemplo de Requisição:

```json
{
  "nome": "Ana Oliveira",
  "email": "ana.oliveira@exemplo.com",
  "senha": "senha123"
}
```

### Resposta se sucesso na criação do usuário:

```json
{
  "mensagem": "Usuário criado com sucesso."
}
```

### Resposta se ocorrer um erro na criação do usuário:

```json
{
  "mensagemInfo": "Usuário não criado devido a conflitos."
}
```

---

## Login de um Usuário

- **ENDPOINT:** `/login`
- **TIPO DE REQUISIÇÃO:** POST

### Exemplo de Requisição:

```json
{
  "email": "ana.oliveira@exemplo.com",
  "senha": "senha123"
}
```

### Resposta se sucesso na autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5vbWUiOiJBbmEgT2xpdmVpcmEiLCJyZWdpc3RybyI6IjIwMjQtMDctMjNUMDM6MDA6MDAuMDAwWiIsImlhdCI6MTY4NTg2NjQ1NSwiZXhwIjoxNjg1OTUyNDU1fQ.dT1loJ6c3AX4RH0PV3ghHLzRj5ODJlGZLlG9N5uy0uU"
}
```

### Resposta se as credenciais forem inválidas:

```json
{
  "mensagemErro": "Usuário ou senha incorretos."
}
```

---

## Detalhar Usuário

- **ENDPOINT:** `/usuarios/:id`
- **TIPO DE REQUISIÇÃO:** GET

### Exemplo de Requisição:

```
/usuarios/15
```

### Resposta se existe:

```json
{
  "id": 15,
  "nome": "Carlos Silva",
  "email": "carlos.silva@exemplo.com",
  "registro": "2024-07-23T03:00:00.000Z"
}
```

### Resposta se não existe:

```json
{
  "mensagemInfo": "Usuário não encontrado."
}
```

---

## Listar Usuários

- **ENDPOINT:** `/usuarios`
- **TIPO DE REQUISIÇÃO:** GET

### Exemplo de Requisição:

```
/usuarios
```

### Resposta se a requisição for bem-sucedida:

```json
{
  "resultadoBusca": [
    {
      "id": 15,
      "nome": "Carlos Silva",
      "email": "carlos.silva@exemplo.com",
      "registro": "2024-07-17T03:00:00.000Z"
    },
    {
      "id": 22,
      "nome": "Laura Martins",
      "email": "laura.martins@exemplo.com",
      "registro": "2024-07-23T03:00:00.000Z"
    }
  ]
}
```

---

## Editar Usuário (Nome e Email)

- **ENDPOINT:** `/usuarios/:id`
- **TIPO DE REQUISIÇÃO:** PUT

### Exemplo de Requisição:

```json
{
  "nome": "Ana Costa",
  "email": "ana.costa@exemplo.com"
}
```

### Resposta se a edição for bem-sucedida:

```json
{
  "mensagemInfo": "Os dados do usuário foram atualizados."
}
```

### Resposta se a edição falhar:

```json
{
  "mensagemErro": "Usuário não atualizado devido a conflitos."
}
```

---

## Excluir Usuário

- **ENDPOINT:** `/usuarios/:id`
- **TIPO DE REQUISIÇÃO:** DELETE

### Exemplo de Requisição:

```
/usuarios/22
```

### Resposta se a exclusão for bem-sucedida:

```json
{
  "mensagemInfo": "Usuário excluído com sucesso."
}
```

### Resposta se a exclusão falhar por erro do usuário:

```json
{
  "mensagemErro": "Recurso não encontrado."
}
```




