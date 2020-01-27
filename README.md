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

## :gear: Back-end

### :information_source: Instruções Back-end

```bash
# instalar PostgreSQL - Banco de dados principal
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

# instalar Redis - Banco de dados para filas
docker run --name redis -p 6379:6379 -d -t redis:alpine

# nome do banco de dados Posgres
fastfeet

# instalar os pacotes e dependências
yarn
```

Faça uma cópia do arquivo .env.example, renomeie para .env e altere as variáveis de acordo com o seu ambiente.

```bash
# criar estrutura do banco de dados Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar servidor da aplicação
yarn dev

```

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## :clap: Obrigado

[Rocketseat](https://rocketseat.com.br/) pelo bootcamp!
