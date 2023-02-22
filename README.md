# <center>Pizzaria Delicia da Bahia</center>

<center><img src="https://i.ibb.co/93rsyR7/home.png" alt="home" border="0"></center>

<center>
    <a href="">
        <img src="https://img.shields.io/badge/preview-vercel-a.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/techdinner/techdinner-api/issues">
        <img src="https://img.shields.io/badge/backend-github-blue.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/techdinner/techdinner-api/pulls">
        <img src="https://img.shields.io/badge/prototype-figma-red.svg?style=for-the-badge">
    </a>
</center>
<center>
     <a>
        <img src="https://img.shields.io/github/license/pizzaria-delicia-da-bahia/website">
    </a>
     <a>
        <img src="https://img.shields.io/github/package-json/v/pizzaria-delicia-da-bahia/website/main">
    </a>
    <a>
        <img src="https://img.shields.io/badge/status-active-success.svg">
    </a>
    <a href="https://github.com/pizzaria-delicia-da-bahia/website/issues">
        <img src="https://img.shields.io/github/issues/pizzaria-delicia-da-bahia/website">
    </a>
    <a href="https://github.com/pizzaria-delicia-da-bahia/website/pulls">
        <img src="https://img.shields.io/github/issues-pr/pizzaria-delicia-da-bahia/website">
    </a>
</center>

### Introduction
Website developed with `Next.js`

### Getting Started
1 - Clone the project, and install the dependencies.
```bash
git clone https://github.com/pizzaria-delicia-da-bahia/website.git
npm install || yarn 
```
2 - Rename the `.env.example` file to `.env`.
3 - Add variables to `.env` file:
```
# This variable set the server url (5002 is the port defined in package.json)
NEXT_PUBLIC_API_URL="http:localhost:5002/api"

# Set 'api' for external database or 'local' for local database with node-json-db (default)
REPO_LOCATION=local

# This is the password you'll use to change database data in /config route
CONFIG_PASSWORD=yourpassword
```
3 - Run the following command
```bash
cd website
npm run dev || yarn dev
```

### Routes

`Static`
```
├─/home
├─/localizacao
└─/sobre
```
`SSR`
```
|─/config
└─/cardapio
```

`SPA`
```
├─/pedido
| ├───/lanche
| ├───/pizza
| |   ├───/tamanho
| |   └───/sabores
| ├───/bebida
| ├───/itens
| ├───/informacoes-adicionais
| ├───/pagamento
| └───/confirmacao
└─────────────────
```
### Tags
`next.js` `styled-components` `axios` `node-json-db` ``