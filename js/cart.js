//CONFIRMAR COMPRA 


//mostrar JSON 
var arrayCarrito = [];

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT2_CART).then(function(resultObj) {
        if (resultObj.status === "ok") {
            arrayCarrito = resultObj.data;
            carritoDeCompras(arrayCarrito.articles);
        }
    })
});

function carritoDeCompras(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let carro = array[i];

        if (carro.currency == "USD") {
            carro.unitCost = carro.unitCost * 40;
            carro.currency = "UYU";
        }

        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + carro.src + `" class="img-thumbnail">
                </div>
                <div class="col-6">
                    <h4 class="mb-1">` + carro.name + `</h4>
                </div>
                <div class="col-3"> 
                    <p class="mb-1">` + carro.currency + " " + `<span name="costounit">` + carro.unitCost + `</span></p>
                    <input onchange="precioTotal()" name="cantidad" type="number" value="` + carro.count + `"min="1" max="1000" step="1"></input>
                </div>
            </div> 
        </a>
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