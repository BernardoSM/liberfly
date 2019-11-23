# Desafio Liberfly
> Muito obrigado por me dar uma oportunidade de demonstrar meus conhecimentos

## Figma
- Link para visualizar o protótipo do projeto: [figma](https://www.figma.com/file/svuARpZ7IrYeYItQltUS1T/Teste?node-id=0%3A1)

## Requisitos
1. Não se preocupe com autenticação de usuário, essa funcionalidade não será necessária neste projeto.
2. Todos os campos do formulário são obrigatórios, uma mensagem de erro deve ser retornada ao usuário caso algum esteja em branco.
3. Trate e-mails e datas inválidas exibindo uma mensagem de erro para o usuário.
4. Trate descrições muito curtas exibindo uma mensagem de erro para o usuário.
5. O front-end precisa ser responsivo e apresentar uma boa visualização e navegação no mobile.
6. O front-end deve interagir com a nossa Web API.

- Observação: No requisito número 6 eu fiz todos os métodos solicitados (get, post e put), porém o post e o put deu esse problema no CORS que não consegui resolver

> Post: Access to XMLHttpRequest at 'https://desafio.liberfly.com.br/api/meetings/' from origin 'http://localhost' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.

> Put: axios.min.js:8 OPTIONS https://desafio.liberfly.com.br/api/meetings/39?situation=cancelado 405 (Method Not Allowed). localhost/:1 Access to XMLHttpRequest at 'https://desafio.liberfly.com.br/api/meetings/39?situation=cancelado' from origin 'http://localhost' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.


## Configurações

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download/)
  - Instale a versão (LTS)
- [Gulp](http://gulpjs.com/)
  - Instale globalmente utilizando o comando `npm install --global gulp-cli` no terminal

### Configuração inicial do projeto

1. Navegue até o diretório-raiz do seu projeto no Terminal (para usuários windows recomendo que [leiam este artigo](https://www.felipefialho.com/blog/2017/usando-o-terminal-do-linux-no-windows))
2. Execute o comando `npm install`
	- Este comando irá instalar todas as dependências do projeto
	- Pode levar alguns minutos
	- Irá produzir muitas informações de depuração (incluindo avisos ocasionais de depreciação) que podem ser ignoradas
3. Execute o comando `gulp`
	- Este comando irá executar todas as tarefas estabelecidas no gulp para visualização do projeto.

### Comandos comuns
- `gulp` - executa e monitora a compilação dos arquivos em src (scss, js, fonts, img)
- `gulp clean` - exclui todos os arquivos compilados

## Arquivos fonte
### Sass (scss)

`style.scss` é o arquivo Sass de nível superior, que normalmente apenas importa os arquivos scss para serem compilados.

#### _variables.scss

Contém todas as variáveis, desde tamanhos de fonte até cores, para facilitar o tempo das funções.

#### _system.scss

Contém todo o css do site.

## Plugins e frameworks
Plugins que utilizei para agilizar o processo:
- [bootstrap 4.3.1](https://getbootstrap.com/)
- [jQuery 3.4.1](https://jquery.com/download/)
- [Vue 2.6.10](https://br.vuejs.org/v2/guide/installation.html)
- [Axios ^0.18.1](https://github.com/axios/axios)
- [Font Awesome 5.8.1](https://fontawesome.com/)

Todos estes itens estão sendo inseridos via gulp, gerando os arquivos `alldep.css` e `alldep.js` para serem indexados ao html.


## Tipografia

Por padrão a fonte inicial utilizada é a **Montserrat** ([link aqui](https://fonts.google.com/specimen/Montserrat)) e se encontra em `src/webfonts`. Para utilizar outra fonte, basta substituir os arquivos na pasta
