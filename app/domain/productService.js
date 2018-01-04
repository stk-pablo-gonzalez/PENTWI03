// productService.js
// Defines the product service to manage the product catalogue

var _products = [
    { id: 11, desc: 'Borrador pizarrón blanco Alfa', price: 19.95 },
    { id: 12, desc: 'Pizarrón blanco Alfa', price: 150.50 },
    { id: 13, desc: 'Plumones magistal p/pizarrón blanco', price: 25.12 }
];

function _findProduct(productId) {
    var product = _products.find(function(p) {
        return p.id == productId;
    });
    
    return product;
}

function getAll() {
    return _products;
}

function get(productId) {
    var product = _findProduct(productId);

    return product;
}

module.exports = {
    get: get,
    getAll: getAll
};