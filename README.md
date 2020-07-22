<h1 align="center">
  <img alt="Fastfeet" title="fastfeet" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio final Fastfeet: back-end, front-end web e mobile
</h3>

<p align = "center">
<a href="https://www.codefactor.io/repository/github/hugo-marcelo/fastfeet"><img src="https://www.codefactor.io/repository/github/hugo-marcelo/fastfeet/badge" alt="CodeFactor" /></a>
<img alt = "Última confirmação do Github" src = "https://img.shields.io/github/last-commit/hugo-marcelo/fastfeet">
<img alt = "Idioma principal do GitHub" src = "https://img.shields.io/github/languages/top/hugo-marcelo/fastfeet">
<img alt = "GitHub" src = "https://img.shields.io/github/license/hugo-marcelo/fastfeet.svg">
<a href="https://www.codacy.com/manual/hugo-marcelo/fastfeet?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hugo-marcelo/fastfeet&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/147d0b2836734c79b7ee5ea035f065b4"/></a>
</p>

<h3 align="center">
  <a href="https://insomnia.rest/run/?label=FastFeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fhugo-marcelo%2Ffastfeet%2Fmaster%2Fbackend%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</h3>

## :gear: Back-end

### :information_source: Deploy

- https://fastfeet-api-hugo.herokuapp.com

### :information_source: Instruções Back-end

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

---

## :computer: Front-end

### :information_source: Deploy

- https://fastfeet-web-hugo.herokuapp.com

### :information_source: Instruções Front-end

```bash
#instalar os pacotes e dependências
yarn

# iniciar a aplicação web
yarn start
```

---

## :iphone: Mobile

### :information_source: Instruções Mobile (iOS)

```bash
#instalar os pacotes e dependências
yarn

# iniciar o aplicativo no emulador do iOS
yarn ios
```

### :information_source: Instruções Mobile (Android)

```bash
#instalar os pacotes e dependências
yarn
```

Alterar a variável baseURL em `/src/services/api.js` colocando o ip local ou do emulador

```bash
# inicializar o aplicativo no emulador do Android
yarn android
```

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## :clap: Obrigado

[Rocketseat](https://rocketseat.com.br/) pelo bootcamp!
