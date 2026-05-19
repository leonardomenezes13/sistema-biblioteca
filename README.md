# Sistema Biblioteca

Projeto fullstack para gerenciamento de livros de uma biblioteca. A aplicacao permite cadastrar, listar, editar, remover, buscar e filtrar livros, usando um backend em Express com MySQL e um frontend em Next.js.

## Objetivo do projeto

O objetivo deste projeto foi praticar a construcao de um CRUD completo, conectando uma API REST a um banco de dados real e consumindo essa API em uma interface web.

Com ele, foi possivel aprender e aplicar conceitos importantes de backend, frontend, banco de dados, organizacao de projeto e integracao entre camadas.

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- MySQL
- mysql2/promise
- dotenv
- cors
- nodemon

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Fetch API

### Ferramentas

- MySQL Workbench
- Git e GitHub
- npm
- VS Code

## Estrutura do projeto

```txt
sistema-biblioteca/
├── back/
│   └── src/
│       ├── controllers/
│       │   └── books.controller.js
│       ├── database/
│       │   └── connection.js
│       ├── routes/
│       │   └── books.routes.js
│       ├── services/
│       │   └── books.service.js
│       └── server.js
├── front/
│   ├── app/
│   │   ├── components/
│   │   ├── livros/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── api.ts
│   └── package.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Como funciona

O backend cria uma API REST usando Express. Essa API se conecta ao MySQL por meio de um pool de conexoes configurado em `back/src/database/connection.js`.

O frontend, feito com Next.js, consome essa API usando funcoes centralizadas em `front/lib/api.ts`. A interface exibe um dashboard com dados do acervo e uma pagina de gerenciamento para criar, editar, remover, buscar, filtrar e ordenar livros.

## Banco de dados

Crie o banco e a tabela no MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS biblioteca;

USE biblioteca;

CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL
);
```

## Variaveis de ambiente

Na raiz do projeto, crie um arquivo `.env`:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=biblioteca
PORT=3000
ALLOWED_ORIGIN=http://localhost:3001
```

No frontend, crie o arquivo `front/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Importante: os arquivos `.env` e `.env.local` nao devem ser enviados para o GitHub, pois podem conter informacoes sensiveis.

## Como instalar

Na pasta raiz do projeto:

```bash
npm install
```

Depois instale as dependencias do frontend:

```bash
cd front
npm install
```

Volte para a raiz:

```bash
cd ..
```

## Como rodar o projeto

Com o MySQL ativo e o banco criado, rode na raiz:

```bash
npm run dev
```

Esse comando inicia backend e frontend ao mesmo tempo.

Normalmente as URLs ficam assim:

```txt
Backend: http://localhost:3000
Frontend: http://localhost:3001
```

Se quiser rodar separadamente:

```bash
npm run dev:back
```

```bash
npm run dev:front
```

## Rotas da API

### Listar livros

```http
GET /books
```

Retorna todos os livros cadastrados.

### Buscar livro por ID

```http
GET /books/:id
```

Retorna um livro especifico.

### Cadastrar livro

```http
POST /books
```

Exemplo de body:

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis"
}
```

### Atualizar livro

```http
PUT /books/:id
```

Exemplo de body:

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis"
}
```

### Remover livro

```http
DELETE /books/:id
```

Remove um livro pelo ID.

## Funcionalidades

- Cadastro de livros
- Listagem de livros
- Edicao de livros
- Remocao de livros
- Busca por titulo ou autor
- Filtro por autor
- Ordenacao por titulo ou autor
- Dashboard com total de livros, autores distintos e media por autor
- Mensagens de erro quando a API nao responde
- Integracao entre frontend, backend e banco de dados

## O que eu aprendi

Durante o desenvolvimento deste projeto, foram praticados varios conceitos importantes:

- Criar uma API com Express
- Organizar o backend em rotas, controllers, services e database
- Conectar Node.js com MySQL usando `mysql2/promise`
- Usar variaveis de ambiente com `dotenv`
- Criar um CRUD completo com SQL
- Usar queries parametrizadas para evitar SQL Injection
- Tratar erros da API com status HTTP adequados
- Validar dados recebidos no corpo da requisicao
- Configurar CORS para permitir acesso do frontend
- Criar uma interface com Next.js e React
- Usar componentes reutilizaveis no frontend
- Consumir API com `fetch`
- Trabalhar com estado no React usando `useState`
- Filtrar e ordenar dados com `useMemo`
- Separar a comunicacao com a API em um arquivo proprio
- Usar TypeScript no frontend
- Configurar scripts para rodar backend e frontend juntos
- Usar Git para versionar mudancas em branches

## Boas praticas aplicadas

- Separacao de responsabilidades no backend
- Arquivo especifico para conexao com banco de dados
- Uso de `.env` para configuracoes sensiveis
- Uso de `.gitignore` para evitar commit de arquivos locais
- Validacao de ID, titulo e autor
- Retorno de erros em JSON
- Componentizacao da interface
- Centralizacao das chamadas HTTP em `front/lib/api.ts`

## Possiveis melhorias futuras

- Criar autenticacao de usuario
- Adicionar paginacao na listagem de livros
- Criar testes automatizados
- Melhorar mensagens de sucesso no frontend
- Criar confirmacao antes de remover livro
- Adicionar campos como ano, editora, categoria e ISBN
- Criar migrations para o banco de dados
- Fazer deploy do backend e do frontend

## Status

Projeto em desenvolvimento, com CRUD principal de livros funcionando e integrado ao banco de dados MySQL.
