// pos.js
// Provides UI functionality for POS solution

$(document).ready(function() {
    var ticket = {
        items: [],
        totalAmount: 0.0
    };

    $('#code').keypress(function(e) {
        if(e.which === 13) {
            addLineItem();
        }
    });

    $('#add').click(function(e) {
        addLineItem();
    });

    $('#confirm').click(function(e) {
        alert('confirm');
    });

    function addLineItem() {
        var code = $('#code').val();
        var qty = 1;

        if(code === '') return;

        getProduct(code).then(function(product) {
           alert(product);
           ticket.items.push({
               id: product.id,
               desc: product.desc,
               price: product.price,
               qty: qty
           });
        });
    }

    function clearAndFocus() {
        $('#code').val('');
        $('#code').focus();
    }

    function getProduct(code) {
        return $.ajax({
            url: 'api/products/' + code,
            dataType: 'json',
            method: 'GET'
        });
    }
});