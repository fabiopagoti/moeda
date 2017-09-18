// Importando dependências
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

// Gerar a aplicação
const app = express();

// Configurar o handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Middleware
app.use(express.static('assets'));
app.use(bodyParser.urlencoded());

//Rotas
app.get('/', (request, response) => {
    response.render('index');
});

//Inicializar o servidor
app.listen(3000, () => {
    console.log('Servidor inicializado');
});
