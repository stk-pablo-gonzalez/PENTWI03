var ticket = {
    items: [],
    totalAmount: 0.0
};

self.addEventListener('message', function(e) {
    var message = e.data;
    console.log(message);

    if(message.action === 'addItem') {
        addItem(message.code, message.qty);
    } else if(message.action === 'cancel') {
        clearTicket();
    } else if(message.action === 'saveTicket') {
        saveTicket();
    }
}, false);

function addItem(productCode, qty) {
    getJson('/api/products/' + productCode, function(product) {
        var item = {
            id: product.id,
            desc: product.desc,
            price: product.price,
            qty: qty
        };
        
        ticket.items.push(item);
        ticket.totalAmount += item.qty * item.price;

        self.postMessage({
            action: 'addItem',
            success: true,
            item: item,
            totalAmount: ticket.totalAmount
        });
    }, function(err) {
        self.postMessage({
            action: 'addItem',
            success: false,
            message: err.status + ': ' + err.response
        });
    });
}

function clearTicket() {
    resetTicket();

    self.postMessage({
        action: 'cancel',
        success: true
    });
}

function saveTicket() {
    postJson('/api/sales', ticket, function() {
        resetTicket();

        self.postMessage({
            action: 'saveTicket',
            success: true
        });
    }, function(err) {
        self.postMessage({
            action: 'saveTicket',
            success: false,
            message: err.status + ': ' + err.response
        });
    });
}

function resetTicket() {
    ticket.items = [];
    ticket.totalAmount = 0.0;
}

function getJson(url, success, error) {
    var xhr = getXmlHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState < 4) return;
        if(xhr.status !== 200) {
            error({
                status: xhr.status,
                response: xhr.responseText
            });
        }
        
        var json = parseJson(xhr.responseText);
        success(json);
    }

    xhr.open('GET', url, true);
    xhr.send('');
}

function postJson(url, obj, success, error) {
    var xhr = getXmlHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState < 4) return;
        if(xhr.status >= 400 && xhr.status <= 503) {
            error({
                status: xhr.status,
                response: xhr.responseText
            });
        }

        success();
    }

    xhr.open('POST', url, true);
    xhr.send(obj);
}

function getXmlHttpRequest() {
    var xhr;
    if(typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
    }
    return xhr;
}

function parseJson(text) {
    return JSON.parse(text);
}