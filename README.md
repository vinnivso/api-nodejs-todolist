# challenge-todolist
ToDoList Challenge - TypeScript Back End

## Desafio To Do List!

Olá, tudo bem? O exercício de hoje vai lidar com um tema que vocês já estão acostumados. Já pedimos para vocês fazerem só o Front, já pedimos para fazerem o Front integrado, já até pedimos um projeto usando somente Node para isso: uma To Do List. Dessa vez, vai ser um pouquinho diferente, vocês vão fazer o backend dela.

Para começar a explicar o nosso sistema vamos falar sobre os usuários. O cadastro deles deve ser simples, pedindo: um nome, um apelido (nickname) e um email

As tarefas são definidas por: título, descrição, data limite até a qual precisa ser feita, status e usuário pedinte (o que criou a tarefa). Existem os usuários responsáveis por uma tarefa, ou seja, aqueles que terão que executa-las. Mais de um usuário pode ser diretamente responsável de mesma tarefa. Os status das tarefas são 3: *to do* ("a fazer"), *doing* ("fazendo") e *done* ("feita").

Dados esses requisitos do sistema, você deve modelar todo o banco de dados (usando MySQL) e implementar o backend. Leia atentamente a lista de endpoints mostrada abaixo antes de começar a modelagem do banco, aí estão descritas todas as informações necessárias para criá-los.

### Endpoints Mínimos

- **1. Criar usuário**

    **Método:** POST
    **Path:** `/user`

    **Body:**

    ```json
    {
    	"name": "Astro Dev",
    	"nickname": "astrodev",
    	"email": "astro@dev.com"
    }
    ```

    **Observações**:

    - O seu código deve validar se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos
    - O seu código deve gerar o id do usuário

- **2. Pegar usuário pelo id**

    **Método:** GET
    **Path:** `/user/:id`

    **Path Param**: é o id do usuário

    **Body de Resposta:**

    ```json
    {
    	"id": "001",
    	"nickname": "astrodev"
    }
    ```

    **Observações**:

    - O endpoint deve retornar um erro se não encontrar o usuário

- **3. Editar usuário**

    **Método:** PUT
    **Path:** `/user/edit/:id`

    **Path Param**: é o id do usuário

    **Body:**

    ```json
    {
    	"name": "Astro Dev",
    	"nickname": "astrodev"
    }
    ```

    **Observações**:

    - O seu código só deve alterar o que for enviado
    - Se algum valor enviado for vazio, deve retornar um erro

- **4. Criar tarefa**

    **Método:** POST
    **Path:** `/task`

    **Body:**

    ```json
    {
    	"title": "Criar banco dos alunos",
    	"description": "Devemos criar o banco dos alunos para o módulo do backend",
    	"limitDate": "04/05/2020",
    	"creatorUserId": "001"
    }
    ```

    **Observações**:

    - O seu código deve validar se todos os campos não estão vazios,
    - O seu código deve gerar o id da tarefa,
    - A data deve se recebida no formato mostrado acima: `DD/MM/YYYY` e o seu código deve fazer a conversão necessária para salvar no banco

- **5. Pegar tarefa pelo id**

    **Método:** GET
    **Path:** `/task/:id`

    **Path Param**: é o id da tarefa

    **Body de Resposta:**

    ```json
    {
    	"taskId": "001",
    	"title": "Criar banco dos alunos",
    	"description": "Devemos criar o banco dos alunos para o módulo do backend",
    	"limitDate": "04/05/2020",
    	"status": "to_do",
    	"creatorUserId": "001",
    	"creatorUserNickname": "astrodev"
    }
    ```

    **Observações**:

    - O endpoint deve retornar um erro se não encontrar a task
    - Perceba que o endpoint retorna informações tanto da tarefa como do usuário criador
    - O seu código deve converter a data recebida do banco para o formato mostrado acima (`DD/MM/YYYY`)

==========================

#### Configurando um banco de dados para testar a solução
- Criar um arquivo .env na root do projeto, ou seja, onde encontra-se o package.json.
- Inserir as informações abaixo no arquivo .env com seus respectivos valores:

DB_HOST = "Name or IP address of the server host"<br/>
DB_USER = "Name of the user to connect with"<br/>
DB_PASSWORD = "The user's password"<br/>
DB_SCHEMA = "The schema to use"

#### Solução
Rode os seguintes comandos dentro da pasta que estiver com o package.json.
- npm run migrations
- npm run dev or npm start

#### Link da Documentação
- https://documenter.getpostman.com/view/16818323/UVRDGkt4

## O que temos aqui?
- [x]  NodeJS
- [x]  TypeScript
- [x]  Express
- [x]  SQL
- [x]  Nodemon
- [x]  Date-fns
- [x]  UUID

## INTEGRANTE
Perfil      | Link do perfil no GITHUB
--------- | ------
[<img src="https://avatars.githubusercontent.com/u/52759918?v=4" width="75px;"/>](https://github.com/vinnivso) | [Vinícius Oliveira](https://github.com/vinnivso)