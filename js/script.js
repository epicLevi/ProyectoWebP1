/**
 * Used to generate random sale id's using RandEx
 */
var saleIdRegEx = /[0-9]{2}[A-Z]{3}[0-9]{2}([0-9]|[A-Z]){3}[0-9]{1,2}/;

$(document).ready(function(){
    insertForm();

    $('#add-btn').click(function(){
        codigo = $('#codigo').val();
        nombre = $('#nombre').val();
        cantidad = $('#cantidad').val();
        precio = $('#precio').val();
        total = cantidad*(precio*1.16);
        totalTru = total.toFixed(2);

        $('.insertion-table tbody').prepend(`
        <tr>
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td>${totalTru}</td>
            <td><input id="delete-btn" class="btn red darken-2" type="button" value="-" /></td>
        </tr>
        `);

        $('#codigo').val("");
        $('#nombre').val("");
        $('#cantidad').val("");
        $('#precio').val("");
    });

    $('#create-ticket-btn').click(function(){
        if (!($('#ticket-card').hasClass('hide'))) {
            emptyTicketCardData();
        }

        var date = new Date();
        
        $('#sale-date').append(`
            ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
        `);

        $('#sale-time').append(` 
            ${date.getHours()}:${(date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes()}
        `);

        appendSaleItems();
        appendSaleId();
        appendIva();

        $('#ticket-card').removeClass('hide');
    });
});

$(document).on("click", "#delete-btn", function(){
    /**
     * Deletes a row from the insertion table.
     */
    $(this).parent().parent().remove();
});

function insertForm(){
    /**
     * Appends form at the bottom of the insertion table.
     */
    $('.insertion-table > tbody').append(`
    <tr id="formulario">
        <td><input type="text" id="codigo"></td>
        <td><input type="text" id="nombre"></td>
        <td><input type="number" id="cantidad"></td>
        <td><input type="number" id="precio"></td>
        <td></td>
        <td><input id="add-btn" class="btn light-blue darken-4" type="button" value="+" /></td>
    </tr>
    `);
}

function emptyTicketCardData(){
    $('sale-date').empty();
    $('#sale-time').empty();
    $('#ticket-table > tbody').empty();
    $('#ticket-table > tbody').append(`
    <tr >
        <td>Cajero</td>
        <td>2</td>
        <td><span id="sale-date"></span></td>
        <td><span id="sale-time"></span></td>
    </tr>
    `);
}

function appendSaleItems(){
    // TODO: Get items from item table.
    
    $('#ticket-table > tbody').append(`
    <tr>
        <td colspan="3">CHOC ANDATTI MED MON</td>
        <td>15.00</td>
    </tr>
    `)
}

function appendSaleId(){
    /**
     * Appends a random string generated 
     * from saleIdRegEx regular expression.
     */
    $('#ticket-table > tbody').append(`
    <tr>
        <td colspan="2">ID=<span id="sale-id">${
            new RandExp(saleIdRegEx).gen()
        }</span></td>
        <td>IVA INCLUIDO:</td>
        <td><span id="total-iva"></span></td>
    </tr>
    `)
}

function appendIva(){
    // TODO: accumulate IVAs and count them here.
    $('#total-iva').append(`$${3.00}`);
}