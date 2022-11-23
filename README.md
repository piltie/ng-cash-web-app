# Instruções

<h1>Pré-requisito para rodar</h1>
É necessário ter o docker desktop instalado (https://docs.docker.com/desktop/).

<h2>1. Instalar dependências</h2>
Abra a pasta na qual você descompatou esse projeto (no diretório onde está o arquivo do docker-compose.yml). Crie uma pasta vazia com nome "postgresql" (é nesta pasta que o banco de dados será armazenado locamente).

Ainda na pasta descompactada, abra o terminal, e digite o comando:

$ npm install

Após a instalação terminar, ainda nesse mesmo terminal, dê o build nos arquivos do docker com o seguinte comando:

$ npm run docker:build

Aguarde o término da instalação.

<h2>2. Rodar aplicação</h2>

Depois da instalação, insira este comando para iniciar o docker:

$ npm run docker:up

Quando o banco de dados, o front-end e o back-end terminarem de startare (os logs irão aparecer no terminal), os projetos podem ser acessados de acordo com as portar definidas nas dockerfiles (porta 8080 para o front-end, e porta 3000 para o back-end). Para parar as aplicações do docker, digite o comando:

$ npm run docker:down

E aguarde até que elas se encerrem.
