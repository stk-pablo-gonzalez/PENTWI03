var port = 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').Server(app);

var io = require('socket.io')(server);

//io.listen(server);

var products = require('./app/routes/products');
var inventory = require('./app/routes/inventory');
var sales = require('./app/routes/sales');

app.use(express.static(__dirname + '/www/static'));
app.use(bodyParser.json());

//GET /
app.get('/', function(request, response) {
    //response.redirect('pos.html');
    response.sendFile(path.join(__dirname + '/www/pos.html'));
});
app.get('/chat', function(requet, response) {
    response.sendFile(path.join(__dirname + '/www/chat.html'));
});

app.use('/api/products', products);
app.use('/api/inventory', inventory);
app.use('/api/sales', sales);

//Chat service
var usernames = {};

io.on('connection', function(socket) {
    console.log('a user connected.');
});

server.listen(port);

console.log('Listening on port: ' + port);