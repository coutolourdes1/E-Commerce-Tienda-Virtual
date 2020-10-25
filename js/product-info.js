//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {});

function validarComentario() {
    var comentario = document.getElementById("IdComentario").value;

    if (comentario == "") {
        document.getElementById("errorComentario").innerHTML = "Debe ingresar un comentario";
        IdComentario.style.borderColor = "red";
        return false;
    } else {
        document.getElementById("errorComentario").innerHTML = "";
        IdComentario.style.borderColor = "green";
        return true;
    }
}

function validateStars() {
    var radios = document.getElementsByName("estrellas");
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) {
            formValid = true;
        }
        i++;
    }
    if (!formValid) {
        document.getElementById("errorEstrellas").innerHTML = "Debe ingresar su calificacion";
        return formValid;
    } else {
        document.getElementById("errorEstrellas").innerHTML = "";
        return formValid;
    }
}

function validarFormulario() {
    if (validateStars() && validarComentario()) {
        document.getElementById("mensajecorrecto").innerHTML = "¡Su mensaje se envío con éxito!";
        mensajecorrecto.style.color = "green";
    } else {
        document.getElementById("mensajecorrecto").innerHTML = "";
    }
}

//informacion 
var product = {};

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productsoldCont");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + ' ' + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;

        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComent) {
        if (resultComent.status === "ok") {
            arrayComentario = resultComent.data;
            comentariosArray(arrayComentario);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultRelated) {
        if (resultRelated.status === "ok") {
            arrayProducts = resultRelated.data;
            productosRelacionados(arrayProducts);
        }
    });
});
// productos relacionados 
var arrayProducts = [];

function productosRelacionados(arrayP) {

    let htmlContentToAppend = "";
    for (let i = 0; i < arrayP.length; i++) {

        let productos = arrayP[i];
        if (i === 1 || i === 3) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + productos.name + `</h4>
                            <small class="text-muted">` + productos.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + productos.description + `</p>
                    </div>
                </div>
            </a>
            `
            document.getElementById("relatedproducts-list-container").innerHTML = htmlContentToAppend;

        }
    }
}

//comentarios
var arrayComentario = [];

function comentariosArray(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {

        let comentarios = array[i];

        htmlContentToAppend += `
        <div class="row">
                <div class="col">
                    <small class="text-muted"> <span class="far fa-user form-control-feedback"></span> ` + comentarios.user + `</small>
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + mostrarCalificacion(comentarios.score) + `</h5>
                        <small class="text-muted">` + comentarios.dateTime + ` </small>
                    </div>
                    <p class="mb-1">` + comentarios.description + `</p>
                    
                </div>
        </div>
        `
        document.getElementById("coment-list-container").innerHTML = htmlContentToAppend;
    }
}

function mostrarCalificacion(estrellas) {
    cantidad = '';
    for (let i = 0; i < 5; i++) {
        if (i < estrellas) {
            marcada = "checked";
        } else {
            marcada = "";
        }

        cantidad += '<span class="fa fa-star ' + marcada + '"></span>';
    };
    return cantidad;
}

//nuevo comentario