var wsUri = "ws://localhost:8080";
var webSocket;

$(document).ready(function() {
    if(checkSupported()) {
        connect();
    }

    $('#btnSend').click(function(e) {
        var message = $('#txtMessage').val();
        sendMessage(message);
    })
});

function checkSupported() {
    if(window.webSocket || WebSocket) {
        console.log('WebSockets supported!');
        return true;
    } else {
        console.log('WebSockets not supported!');
        return false;
    }
}

function connect() {
    webSocket = new WebSocket(wsUri);
    webSocket.onopen = function(e) {
        console.log('CONNECTED');
    };
    webSocket.onclose = function(e) {
        console.log('DISCONNECTED');
    };
    webSocket.onmessage = function(e) {
        console.log('RESPONSE: ' + e.data);
        showMessage(e.data);
    };
    webSocket.onerror = function(e) {
        console.log('ERROR: ' + e.data);
    }
}

function sendMessage(message) {
    if(webSocket.readyState !== webSocket.OPEN) {
        console.log('NOT OPEN: ' + message);
        return;
    }

    console.log('SENT: ' + message);
    webSocket.send(message);
}

function showMessage(message) {
    var val = $('#chat').val();
    val += message + '\n';
    $('#chat').val(val);
}