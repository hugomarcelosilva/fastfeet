### :information_source: Instruções

#### :whale: Executando com Docker Compose

```bash
# instalar os contâineres da API, PostgreSQL e Redis
docker-compose up -d
```

#### :whale: Executando com Docker localmente

```bash
# instalar PostgreSQL - Banco de dados principal
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

# instalar Redis - Banco de dados para filas
docker run --name redis -p 6379:6379 -d -t redis:alpine

# instalar os pacotes e dependências
yarn
```

Faça uma cópia do arquivo .env.example, renomeie para .env e altere as variáveis de acordo com o seu ambiente.

```bash
# nome do banco de dados Posgres
fastfeet

# criar estrutura do banco de dados Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar servidor da aplicação
yarn dev

# executar os testes
yarn test

```
