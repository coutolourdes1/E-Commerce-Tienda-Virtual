//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function validarParametros() {
    var valor_email = document.getElementById("email").value;
    var valor_password = document.getElementById("password").value;
    if(valor_email == ""){
        document.getElementById("error1").innerHTML = "Ingrese datos";
    }else if(valor_password == ""){
        document.getElementById("error2").innerHTML = "Ingrese datos";
    }else{
        window.location.href = "principal.html";
    }
}

document.addEventListener("DOMContentLoaded", function(e){
});


