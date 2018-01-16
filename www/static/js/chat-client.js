var wsUri = "ws://localhost:8080";
var webSocket;

$(document).ready(function() {
    if(checkSupported()) {
        connect();
    }
});

function checkSupported() {
    if(window.webSocket) {
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
        onOpen(e);
    };
    webSocket.onclose = function(e) {
        onClose(e);
    };
    webSocket.onmessage = function(e) {
        onMessage(e);
    };
    webSocket.onerror = function(e) {
        onError(e);
    }
}