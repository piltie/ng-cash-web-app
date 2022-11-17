# Instruções

<h2>Setup</h2>
<i>Observação: A aplicação está configurada para o superusuário padrão "postgres" com a senha "1234", num banco "ngcashweb" no port 5432. Essas configurações são definidas no arquivos /src/.env e /src/config/default.ts.</i>

É necessário baixar o PostgreSQL de forma local (https://www.postgresql.org/download/) e seguir as instruções de instalação (coloque a senha como 1234 ao definir o superusuário "postgres")

Para acessar o postgre de um terminal e criar o banco (se for usar o psql, não é necessário):
`psql -h localhost -p 5432 -U postgres`

Para criar o banco:
`CREATE DATABASE ngcashweb`

<h2>2. Projeto</her>
Dê um git clone neste repositório

`npm i`
`npm start`

Abra o endereço que apareceu no terminal do frontend no navegador para acessar a aplicação.
