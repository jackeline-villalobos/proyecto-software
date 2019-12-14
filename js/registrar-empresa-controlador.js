'use strict';

const input_nombreEmpresa = document.querySelector('#txt-nombreEmpresa');
const input_razonSocial = document.querySelector('#txt-razonSocial');
const input_cedulaJuridica = document.querySelector('#txt-cedulaJuridica');
const input_telefono = document.querySelector('#txt-telefono');
const input_correo = document.querySelector("#txt-correo");
const input_direccion = document.querySelector('#direcciones');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');
const input_imagen = document.querySelector("#imagePreview");


let input_latitud = document.querySelector("#latitud");
let input_longitud = document.querySelector("#longitud");

const btnCoordenadas = document.querySelector("#coordenadas");


const btn_guardar = document.querySelector('#btn-registrar');


let validar = () => {
    let error = false;
    let errorCodigo;
    let validarTelefono = /^[\+]?[0-9]{4}?[-\s\.]?[0-9]{4}$/im;
    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    let z2 = /^[0-9]+$/; // 1 o mas



    if (input_nombreEmpresa.value == "" || input_nombreEmpresa.value == " " || input_nombreEmpresa.value == 0) {
        error = true;
        input_nombreEmpresa.classList.add("error");
        errorCodigo = 1;
    } else {
        input_nombreEmpresa.classList.remove("error");
    };

    if (input_razonSocial.value == "" || input_razonSocial.value == " " || input_razonSocial.value == 0) {
        error = true;
        input_razonSocial.classList.add("error");
        errorCodigo = 2;
    } else {
        input_razonSocial.classList.remove("error");
    };

    if (input_cedulaJuridica.value == "" || input_cedulaJuridica == " " || input_cedulaJuridica == 0) {
        error = true;
        input_cedulaJuridica.classList.add("error");
        errorCodigo = 3;
    } else {
        input_cedulaJuridica.classList.remove("error");
    };
    if (!z2.test(input_cedulaJuridica.value)) {
        error = true;
        input_cedulaJuridica.classList.add("error");
    } else {
        input_cedulaJuridica.classList.remove("error");
    }

    if (input_correo.value == 0) {
        error = true;
        input_correo.classList.add("error");
    } else {
        input_correo.classList.remove("error");
    }



    if (revisar_correo.test(input_correo.value) == false) {
        error = true;
        input_correo.classList.add('error');
    } else {
        input_correo.classList.remove('error');
    }

    if (input_telefono.value == "" || input_telefono.value.length > 9 || input_telefono.value == " ") {
        error = true;
        input_telefono.classList.add("error");
        errorCodigo = 4;
    } else {
        input_telefono.classList.remove("error");

    };

    // Valida si el telefono no tiene formato adecuado
    if (validarTelefono.test(input_telefono.value) == false) {
        error = true;
        input_telefono.classList.add('error');
    } else {
        input_telefono.classList.remove('error');
    }

    if (input_direccion.value == "" || input_direccion.value == " ") {
        error = true;
        input_direccion.classList.add("error");
        errorCodigo = 5;
    } else {
        input_direccion.classList.remove("error");
    };

    if (input_provincia.value == "" || input_provincia.value == " ") {
        error = true;
        input_provincia.classList.add("error");
        errorCodigo = 6;
    } else {
        input_provincia.classList.remove("error");
    };

    if (input_canton.value == "" || input_canton.value == " ") {
        error = true;
        input_canton.classList.add("error");
        errorCodigo = 7;
    } else {
        input_canton.classList.remove("error");
    };

    if (input_distrito.value == "" || input_distrito.value == " ") {
        error = true;
        input_distrito.classList.add("error");
        errorCodigo = 8;
    } else {
        input_distrito.classList.remove("error");
    };
    /*
    if (input_imagen.src == 'imagenes/registrar-evento/outlined_placeholder-512.png') {
        error = true;
        input_imagen.classList.add('error');
    } else {
        input_imagen.classList.remove('error');
    };
    */

    return error;

};


let resetForm = () => {
    input_nombreEmpresa.value = '';
    input_razonSocial.value = '';
    input_cedulaJuridica.value = '';
    input_telefono.value = '';
    input_correo.value = '';
    input_direccion.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
    input_imagen.src = "imagenes/registrar-evento/outlined_placeholder-512.png";
    input_latitud = "";
    input_longitud = "";
};
let obtener_datos = async() => {

    let nombreEmpresa = input_nombreEmpresa.value;
    let razonSocial = input_razonSocial.value;
    let cedulaJuridica = input_cedulaJuridica.value;
    let telefono = input_telefono.value;
    let correo = input_correo.value;
    let direccion = input_direccion.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let imagen = imagePreview.src;
    let latitud = input_latitud.value;
    let longitud = input_longitud.value;


    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos no se ingresaron correctamente.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendido'
        })


    } else {
        let contrasenna = generarContrasena();

        let errorCorreo = await verificarCorreo(correo);

        if (!errorCorreo) {
            input_correo.classList.add('error');
            Swal.fire({
                icon: 'warning',
                title: 'El usuario ya ha sido registrado',
                text: 'Inténtelo de nuevo',
                confirmButtonText: 'Entendido'
            });
        } else {

            let error = await registrar_empresa(nombreEmpresa, razonSocial, cedulaJuridica, telefono, correo, direccion, provincia, canton, distrito, imagen, latitud, longitud, contrasenna);

            if (error == false) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Algo salió mal',
                    text: 'Inténtelo de nuevo',
                    confirmButtonText: 'Entendido'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro realizado con éxito',
                    text: 'El usuario ha sido registrado',
                    confirmButtonText: 'Entendido',
                    onClose: function() {
                        window.location.href = "iniciar-sesion.html";
                    }
                });
                resetForm();
            }

        }
    }


};

let generarContrasena = () => {
    let mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let caracterEspecial = ['!', '@', '#', '$', '%', '=', '&', '*', '?', '_'];
    // 1 mayúscula
    let contrasena = mayusculas[Math.floor(Math.random() * mayusculas.length)] +
        // 5 minúsculas
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        // 1 número
        [Math.floor((Math.random() * 33) + 1)] +
        // 1 caracter especial
        caracterEspecial[Math.floor(Math.random() * caracterEspecial.length)];

    return contrasena;
};

btn_guardar.addEventListener('click', obtener_datos);
btnCoordenadas.addEventListener("click", ubicarMap);