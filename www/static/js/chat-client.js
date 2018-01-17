var wsUri = "ws://localhost:8080";
var webSocket;

$(document).ready(function() {
    if(checkSupported()) {
        connect();
    }
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
    };
    webSocket.onerror = function(e) {
        console.log('ERROR: ' + e.data);
    }
}