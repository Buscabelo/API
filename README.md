# API da Plataforma Buscabelo

| Recomendações |
| ---------- |
| [Insomnia](https://insomnia.rest/) |
| [PostegreSQL](https://www.postgresql.org/) |

## Para rodar a aplicação

**Para Rodar a aplicação você precisa ter o postegres instalado na maquina e com um banco de dados já criado. Verifique o arquivo ormconfig.json para colocar as informações do seu banco local.**

Abra o terminal e ultilize o comando abaixo para instalar as dependências:

```sh
$ yard
```

Após isso, ultize o comando:

```sh
$ yarn dev
```

 Agora você pode ultilizar o Insomnia (Ou outro plataforma para testar as requisições da API) para testar a API na URL http://localhost:3000/v1

 Para acessar a documentação via swagger acesse a rota : http://localhost:3000/api-doc

 ## Documentações

 - [Buscabelo](https://gitlab.devops.ifrn.edu.br/tads.cnat/pdsdistribuido/2021.1/buscabelo/buscabelo-general)
 - [Node.js](https://nodejs.org/en/docs/)
