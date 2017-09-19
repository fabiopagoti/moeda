// Importando dependências
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require('request');

// Gerar a aplicação
const app = express();

// Configurar o handlebars
app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Middleware
app.use(express.static('assets'));
app.use(bodyParser.urlencoded());

//Rotas
app.get('/', (req, res) => {

	request.get('http://api.fixer.io/latest?base=brl', (error, apiRequest, body) => {
		let data = JSON.parse(body);
		res.render('index', {
			taxa: data.rates.USD
		});
	})

})

app.post('/conversao', (req, res) => {


	request.get('http://api.fixer.io/latest?base=brl', (error, apiRequest, body) => {
		let data = JSON.parse(body);
		let valor = req.body.valor;
		let cotacao = data.rates.USD;
		let resultado = valor * cotacao;

		// res.redirect('/resposta?resultado=' + resultado);

		res.render('resposta', {
			valor: Number(resultado).toFixed(2)
		})

	})
})

app.get('/conversao', (req, res) => {
	res.redirect('/')
})

//Inicializar o servidor
app.listen(3000, () => {
	console.log('Servidor inicializado');
});