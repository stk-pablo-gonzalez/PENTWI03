const port = 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').createServer(app);

const WebSocket = require('ws');

//io.listen(server);

var products = require('./app/routes/products');
var inventory = require('./app/routes/inventory');
var sales = require('./app/routes/sales');

app.use(express.static(__dirname + '/www/static'));
app.use(bodyParser.json());

//GET /
app.get('/pos', function(request, response) {
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

var ws = new WebSocket.Server({ server });
ws.on('connection', function(socket) {
    console.log('a user connected.');
    socket.on('message', function(data) {
        console.log('received: ' + data);
        ws.clients.forEach(function(client) {
            if(client.readyState === WebSocket.OPEN) {
                console.log('SENT (' + client.id + '): ' + data);
                client.send(data);
            }
        })
    });
});

server.listen(port, function() {
    console.log('Listening on port: ' + port);
});
