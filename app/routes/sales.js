// Sales.js
// Define the Sales API routes and actions

var express = require('express');
var routes = express.Router();

var _inventory = require('../domain/inventory');

// POST /api/sales
// {
//     items: [
//         { productId: 12, qty: 10, unitPrice: 12.2 },
//         { productId: 13, qty: 12, unitPrice: 13.4 }
//     ],
//     totalAmount: 282.8
// }
routes.post('/', function(request, response) {
    var salesObj = request.body;

    try {
        for(var i in salesObj.items) {
            var item = salesObj.items[i];
            console.log(item);

            _inventory.remove(item.productId, item.qty);
        }
    } catch(error) {
        console.log(error);
        response.status(403).send(error.message);
    }

    response.send();
});

module.exports = routes;