// Products.js
// Define the Products API routes and actions

var express = require('express');
var route = express.Router();

var productService = require('../domain/productService');

// GET /api/products
route.get('/', function(request, response) {
    var products = productService.getAll();

    response.json(products);
});

// GET /api/products/{id}
route.get(/(\d+)/, function(request, response) {
    var productId = request.params[0];
    var product = productService.get(productId);
    
    response.json(product);
});

module.exports = route;