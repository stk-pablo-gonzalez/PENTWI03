// Inventory.js
// Define the Inventory API routes and actions

var express = require('express');
var route = express.Router();

var _inventory = require('../domain/inventory');

// GET /api/inventory
route.get('/', function(request, response) {
    var inventoryData = _inventory.getAll();

    response.json(inventoryData);
});

// GET /api/inventory/{productId}
route.get(/(\d+)/, function(request, response) {
    var productId = request.params[0];
    var inventoryData = _inventory.get(productId);
    
    response.json(inventoryData);
});

// POST ??

module.exports = route;