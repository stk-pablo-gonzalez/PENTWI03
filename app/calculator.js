var ns = {};

class Stack {
    constructor() {
        this._array = [];
    }

    push(value) {
        this._array.push(value);
    }

    pop() {
        return this._array.pop();
    }

    clear() {
        this._array = [];
    }

    get count() {
        return this._array.length;
    }
}

$(document).ready(function() {
    var rpnStack = new Stack();
    var opStack = new Stack();
    var canAppend = true;

    $("button").click(function() {
        var key = $(this).attr("data-value");
        console.log("clicked: " + key);
        handleKey(key);
    });

    function handleKey(key) {
        if(isDigit(key)) {
            appendDisplay(key);
        } else if(isClear(key)) {
            reset();
        } else {
            canAppend = false;
            
            var operand = getDisplay();
            rpnStack.push(operand);
            
            if(rpnStack.count == 1) {
                opStack.push(key);
            } else {
                var operator = opStack.pop();
                var result = NaN;

                if(operator === "equal") {
                    result = rpnStack.pop();
                } else {
                    var a = rpnStack.pop();
                    var b = rpnStack.pop();
                    result = operations[operator](a, b);
                    rpnStack.push(result);
                    opStack.push(key);
                }
                setDisplay(result);
            }
        }
    }

    function isDigit(data) {
        var pattern = /[0-9]/i;
        return pattern.test(data);
    }

    function isClear(key) {
        return key === "clear";
    }

    function setDisplay(value) {
        $("#txtDisplay").val(value);
    }

    function getDisplay() {
        return Number($("#txtDisplay").val());
    }

    function appendDisplay(data) {
        var value = getDisplay();
        if(value == "0") value = "";

        if(canAppend) {
            value += "" + data;
        } else {
            value = data;
            canAppend = true;
        }

        setDisplay(value);
    }

    function reset() {
        setDisplay("0");
        rpnStack.clear();
        opStack.clear();
    }

    var operations = {
        sum: function(a, b) {
            return a + b;
        },
        substract: function(a, b) {
            return a - b;
        },
        multiply: function(a, b) {
            return a * b;
        },
        divide: function(a, b) {
            return a / b;
        },
        pct: function(a, b) {
            return a * (b / 100);
        },
        equal: function() {

        }
    };

    function init() {
        $("#txtDisplay").css("width", "100%");
        $("button").css("width", "100%");  
    }

    init();
});