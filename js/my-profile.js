//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    JSONprofile = JSON.parse(window.localStorage.getItem("perfil"));
    cargarDatos();

});

var perfil = {
    "nombre": "",
    "edad": null,
    "email": "",
    "telefono": "",
    "localidad": " "
}

function cargarDatos() {
    var user = localStorage.getItem("perfil");
    var obj = JSON.parse(user);

    document.getElementById("imprimirnombre").innerHTML = obj.nombre;
    document.getElementById("imprimirEdad").innerHTML = obj.edad;
    document.getElementById("imprimircorreo").innerHTML = obj.email;
    document.getElementById("imprimirtelefono").innerHTML = obj.telefono;
    document.getElementById("imprimirlocalidad").innerHTML = obj.localidad;
}

function guardarDatos() {

    document.getElementById("errortotal").innerHTML = "";
    perfil.nombre = document.getElementById("nombreyapellido").value;
    perfil.edad = document.getElementById("edad").value;
    perfil.email = document.getElementById("email").value;
    perfil.telefono = document.getElementById("telcontacto").value;
    perfil.localidad = document.getElementById("localidad").value;

    var JSONprofile = JSON.stringify(perfil);
    localStorage.setItem("perfil", JSONprofile);

    if ((perfil.nombre == "") || (perfil.edad == null) && (perfil.email == "") && (perfil.telefono == "") && (perfil.localidad == "")) {
        nombreyapellido.style.borderColor = "red";
        edad.style.borderColor = "red";
        telcontacto.style.borderColor = "red";
        email.style.borderColor = "red";
        localidad.style.borderColor = "red";
    } else if (perfil.edad == null) {
        edad.style.borderColor = "red";
    } else if (perfil.email == "") {
        email.style.borderColor = "red";
    } else if (perfil.telefono == "") {
        telefono.style.borderColor = "red";
    } else {
        nombreyapellido.style.borderColor = "green";
        edad.style.borderColor = "green";
        telcontacto.style.borderColor = "green";
        email.style.borderColor = "green";
        localidad.style.borderColor = "green";

        cargarDatos();

    }
}