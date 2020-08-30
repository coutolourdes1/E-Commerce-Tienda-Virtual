//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
miStorage = window.sessionStorage;

function validarParametros() {
    var valor_email = document.getElementById("email").value;
    var valor_password = document.getElementById("password").value;
    var valor_usuario = document.getElementById("user").value;

    if((valor_email == "") && (valor_password == "") && (valor_usuario == "")){
        document.getElementById("error1").innerHTML = "Debe ingresar datos en todos los campos";
        email.style.borderColor = "red";
        password.style.borderColor = "red";
        user.style.borderColor = "red";

    }else if(valor_email == ""){
        document.getElementById("error3").innerHTML = "Ingrese correo";
        email.style.borderColor = "red";

    }else if(valor_password == ""){
        document.getElementById("error2").innerHTML = "Ingrese contraseña";
        password.style.borderColor = "red";
    }else{

        var usuario = document.getElementById("user").value;
        sessionStorage.setItem("usuario", usuario);

        window.location.href = "principal.html";
    }
}
document.addEventListener("DOMContentLoaded", function(e){
});

