// pos.js
// Provides UI functionality for POS solution

$(document).ready(function() {
    var ticket = {
        items: [],
        totalAmount: 0.0
    };
    var posWorker = new Worker('js/posWorker.js');

    posWorker.addEventListener('message', function(e) {
        var message = e.data;

        if(message.action === 'addItem') {
            if(message.success) {
                showLineItem(message.item);
                showTotal(message.totalAmount);
            } else {
                alert(message.message);
            }
        } else if(message.action === 'saveTicket') {
            if(message.success) {
                alert('Ticket saved!');
                resetAll();
            }
        }
    })

    $('#code').keypress(function(e) {
        if(e.which === 13) {
            addLineItem();
        }
    });

    $('#add').click(function(e) {
        addLineItem();
    });

    $('#confirm').click(function(e) {
        posWorker.postMessage({
            action: 'saveTicket'
        });
    });

    function removeItem(id) {
        alert('remove ' + id);
    }

    function addLineItem() {
        var code = $('#code').val();
        var qty = 1;

        if(code === '') return;

        posWorker.postMessage({
            action: 'addItem',
            code: code,
            qty: qty
        });
        /*
        getProduct(code).then(function(product) {
           alert(product.id + ' ' + product.desc);
           var item = {
                id: product.id,
                desc: product.desc,
                price: product.price,
                qty: qty
            };
            
            ticket.items.push(item);
            ticket.totalAmount += item.qty * item.price;
            showLineItem(item);
            showTotal();
        });
        */
        clearAndFocus();
    }

    function showLineItem(item) {
        var innerHtml = '<tr><td>' + item.id + '</td>'
            + '<td>' + item.qty + '</td>'
            + '<td>' + item.price + '</td>'
            + '<td>' + item.desc + '</td>'
            + '<td>&nbsp;</td>';
            //+ '<td><button type="button" click="removeItem(' + item.id + ')">Delete</button></td>';

        $('#detail tbody').append(innerHtml);
    }

    function showTotal(amount) {
        $('#total h3').text('$ ' + amount);
    }

    function clearAndFocus() {
        $('#code').val('');
        $('#code').focus();
    }

    function resetAll() {
        clearAndFocus();
        $('#detail tbody').empty();
        showTotal(0.0);
    }

    /*
    function getProduct(code) {
        return $.ajax({
            url: 'api/products/' + code,
            dataType: 'json',
            method: 'GET'
        });
    }
    */
});