var port = 8080;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var products = require('./app/routes/products');
var inventory = require('./app/routes/inventory');
var sales = require('./app/routes/sales');

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

//GET /
app.get('/', function(request, response) {
    response.redirect('calculator.html');
});

app.use('/api/products', products);
app.use('/api/inventory', inventory);
app.use('/api/sales', sales);

app.listen(port);

console.log('Listening on port: ' + port);