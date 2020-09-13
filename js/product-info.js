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
});

//carrusel de imagenes
$('.carousel').carousel();

//comentarios
var arrayComentario = [];

function comentariosArray(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {

        let comentarios = array[i];

        htmlContentToAppend += `
        <div class="row">
                <div class="col">
                    <small class="text-muted"> Usuario: ` + comentarios.user + ` </small>
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + "Puntuación: " + comentarios.score + `</h5>
                        <small class="text-muted">` + comentarios.dateTime + ` </small>
                    </div>
                    <p class="mb-1">` + comentarios.description + `</p>
                    
                </div>
        </div>
        `
        document.getElementById("coment-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            arrayComentario = resultObj.data;
            comentariosArray(arrayComentario);
        }
    });
});