//CONFIRMAR COMPRA 

function validarTipoEnvio() {
    var Tenvios = document.getElementsByName("envio");
    var validar_envio = false;

    var i = 0;
    while (!validar_envio && i < Tenvios.length) {
        if (Tenvios[i].checked) {
            validar_envio = true;
        }
        i++;
    }
    if (!validar_envio) {
        document.getElementById("errorTipoEnvio").innerHTML = "Debe seleccionar un tipo de envío";
        return validar_envio;
    } else {

        var tenvio = document.getElementById("costoEnvio").innerText;

        if (tenvio == "0") {
            document.getElementById("errorTipoEnvio").innerHTML = "";
            $('#modalFormaPago').modal('show');
            return validar_envio;
        } else {
            var valor_nombrecompleto = document.getElementById("nombre_completo").value;
            var valor_direccion = document.getElementById("direccion1").value;
            var valor_direccion2 = document.getElementById("direccion2").value;
            var valor_depto = document.getElementById("departamento").value;
            var valor_codpostal = document.getElementById("codigo_postal").value;

            if ((valor_nombrecompleto == "") && (valor_direccion == "") && (valor_direccion2 == "") && (valor_depto == "") && (valor_codpostal == "")) {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe ingresar datos en todos los campos";
                nombre_completo.style.borderColor = "red";
                direccion1.style.borderColor = "red";
                direccion2.style.borderColor = "red";
                departamento.style.borderColor = "red";
                codigo_postal.style.borderColor = "red";
                nav_envio_tab.style.borderColor = "red";

            } else if (valor_nombrecompleto == "") {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe completar el campo";
                nombre_completo.style.borderColor = "red";
            } else if (valor_direccion == "") {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe completar el campo";
                direccion1.style.borderColor = "red";
            } else if (valor_direccion2 == "") {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe completar el campo";
                direccion2.style.borderColor = "red";
            } else if (valor_depto == "") {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe completar el campo";
                departamento.style.borderColor = "red";
            } else if (valor_codpostal == "") {
                document.getElementById("errorDatosEnvio").innerHTML = "Debe completar el campo";
                codigo_postal.style.borderColor = "red";
            } else {
                document.getElementById("errorDatosEnvio").innerHTML = "";
                nombre_completo.style.borderColor = "green";
                direccion1.style.borderColor = "green";
                direccion2.style.borderColor = "green";
                departamento.style.borderColor = "green";
                codigo_postal.style.borderColor = "green";

                document.getElementById("errorTipoEnvio").innerHTML = "";
                $('#modalFormaPago').modal('show');
                return validar_envio;
            }
        }
    }
}


//mostrar JSON 
var arrayCarrito = [];
var arrayMensaje = [];

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT2_CART).then(function(resultObj) {
        if (resultObj.status === "ok") {
            arrayCarrito = resultObj.data;
            carritoDeCompras(arrayCarrito.articles);
        }
    });
    getJSONData(CART_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            arrayMensaje = resultObj.data;
            compraExitosa(arrayMensaje.msg);
        }
    });

});

function compraExitosa(mensaje) {
    document.getElementById("mensaje_compraExitosa1").innerHTML = mensaje;
    document.getElementById("mensaje_compraExitosa2").innerHTML = mensaje;
}

function carritoDeCompras(array) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `   
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr> 
                    <th> Imagen </th>
                    <th> Nombre </th>
                    <th> Costo unitario </th>
                    <th> Cantidad </th>
                    <th> Eliminar </th>
                </tr>
            </thead>
        </table> `
    for (let i = 0; i < array.length; i++) {
        let carro = array[i];

        if (carro.currency == "USD") {
            carro.unitCost = carro.unitCost * 40;
            carro.currency = "UYU";
        }

        htmlContentToAppend += `
            <div class-"container">
                <tbody>
                    <tr>
                        <div class="row">
                            <div class="col"> <th scope="row">  <img src="` + carro.src + `" class="img-thumbnail"> </th> </div>
                            <div class="col"> <td> ` + carro.name + `</td> </div>   
                            <div class="col"> <td> ` + carro.currency + +carro.unitCost + `</td> </div>
                            <div class="col"> <td>  
                                <p class="mb-1">` + carro.currency + " " + `<span name="costounit">` + carro.unitCost + `</span></p>
                                <input onchange="precioTotal()" name="cantidad" type="number" value="` + carro.count + `"min="1" max="1000" step="1"></input>
                                </td> </div>
                            <div class="col"><td> <i class="fas fa-trash-alt"></i> </td> </div>
                        </div>
                    </tr>
                </tbody>
            </div>

        `
        document.getElementById("cartProducts-list-container").innerHTML = htmlContentToAppend;

    }
    precioTotal();
}

function precioTotal() {
    let cantidad = document.getElementsByName("cantidad");
    let costo = document.getElementsByName("costounit");
    let suma = 0;

    let sumaprod1 = parseInt(costo[0].innerHTML) * parseInt(cantidad[0].value);
    document.getElementById("totalProduct1").innerHTML = sumaprod1;

    let sumaprod2 = parseInt(costo[1].innerHTML) * parseInt(cantidad[1].value);
    document.getElementById("totalProduct2").innerHTML = sumaprod2;

    for (let j = 0; j < cantidad.length; j++) {
        suma += parseInt(costo[j].innerHTML) * parseInt(cantidad[j].value);
    }
    document.getElementById("subtotal").innerHTML = suma;
}

//calcular costo de envio 

function calcularEnvio() {
    var costo_envio = document.forms[0];
    var enviofinal = "";
    var sub = document.getElementById("subtotal").innerText;

    for (let i = 0; i < costo_envio.length; i++) {
        if (costo_envio[i].checked) {
            enviofinal = costo_envio[i].value * sub / 100;
        }
    }
    document.getElementById("costoEnvio").innerHTML = enviofinal;

    document.getElementById("total").innerHTML = parseInt(enviofinal) + parseInt(sub);
}


function validarDatosCrédito() {
    var valor_mes = document.getElementById("mes").value;
    var valor_anio = document.getElementById("anio").value;
    var valor_codigo = document.getElementById("codigo").value;
    var valor_numero = document.getElementById("numero").value;
    var valor_nombre = document.getElementById("nombretarjeta").value;

    if ((valor_mes == "") && (valor_anio == "") && (valor_nombre == "") && (valor_numero == "") && (valor_codigo == "")) {
        document.getElementById("errorpagocred").innerHTML = "Debe ingresar datos en todos los campos";
        mes.style.borderColor = "red";
        anio.style.borderColor = "red";
        codigo.style.borderColor = "red";
        numero.style.borderColor = "red";
        nombretarjeta.style.borderColor = "red";

    } else if (valor_mes == "") {
        document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
        mes.style.borderColor = "red";
    } else if (valor_anio == "") {
        document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
        anio.style.borderColor = "red";
    } else if (valor_codigo == "") {
        document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
        codigo.style.borderColor = "red";
    } else if (valor_numero == "") {
        document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
        numero.style.borderColor = "red";
    } else if (valor_nombre == "") {
        document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
        nombretarjeta.style.borderColor = "red";
    } else {
        document.getElementById("errorpagocred").innerHTML = "";
        mes.style.borderColor = "green";
        anio.style.borderColor = "green";
        codigo.style.borderColor = "green";
        numero.style.borderColor = "green";
        nombretarjeta.style.borderColor = "green";

        $('#compraexitosa1').modal('show');
    }
}

function validarDatosBanco() {
    var valor_titular = document.getElementById("titular").value;
    var valor_numcuenta = document.getElementById("numerocuentabanc").value;
    var valor_iban = document.getElementById("iban").value;

    if ((valor_titular == "") && (valor_numcuenta == "") && (valor_iban == "")) {
        document.getElementById("errorpagobanc").innerHTML = "Debe ingresar datos en todos los campos";
        titular.style.borderColor = "red";
        numerocuentabanc.style.borderColor = "red";
        iban.style.borderColor = "red";

    } else if (valor_titular == "") {
        document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
        titular.style.borderColor = "red";
    } else if (valor_numcuenta == "") {
        document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
        numerocuentabanc.style.borderColor = "red";
    } else if (valor_iban == "") {
        document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
        iban.style.borderColor = "red";
    } else {
        document.getElementById("errorpagobanc").innerHTML = "";
        titular.style.borderColor = "green";
        numerocuentabanc.style.borderColor = "green";
        iban.style.borderColor = "green";

        $('#compraexitosa2').modal('show');
    }
}