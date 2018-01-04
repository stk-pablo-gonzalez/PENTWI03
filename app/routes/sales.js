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
    var uow = [];

    try {
        for(var i in salesObj.items) {
            var item = salesObj.items[i];

            _inventory.remove(item.productId, item.qty);
            uow.push(item);
        }

        response.send();
    } catch(error) {
        console.log(error);

        for(var i in uow) {
            var item = uow[i];
            _inventory.add(item.productId, item.qty);
        }

        response.status(400).send(error.message + ' Product Id: ' + error.data.productId);
    }
});

module.exports = routes;