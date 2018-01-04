// inventory.js
// Inventory domain model

var _inventory = [
    { productId: 11, qty: 19 },
    { productId: 12, qty: 150 },
    { productId: 13, qty: 25 }
];

function _findProduct(productId) {
    var product = _inventory.find(function(p) {
        return p.productId == productId;
    });
    
    return product;
}

function add(productId, qty) {
    var productData = _findProduct(productId);

    productData.qty += qty;
}

function remove(productId, qty) {
    var productData = _findProduct(productId);

    if(productData.qty < qty) {
        throw Error("Not enough existence in inventory.");
    }

    productData.qty -= qty;
}

function get(productId) {
    var productData = _findProduct(productId);

    return productData;
}

function getAll() {
    return _inventory;
}

module.exports = {
    add: add,
    remove: remove,
    get: get,
    getAll: getAll
};