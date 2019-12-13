"use strict";

const inputTelefono = document.querySelector('#txt-telefono');
const inputNombreCompleto = document.querySelector('#txt-nombreCompleto');
const inputFechaDeNacimiento = document.querySelector('#txt-edad');
const inputGenero = document.querySelector('#txt_genero');
const urlParams = new URLSearchParams(window.location.search);
const correoURL = urlParams.get('correo');


console.log(correoURL);
const btnRegistrar = document.querySelector('#btn-registrar');


let validar = () => {
    let error = false;
    
    let validarTelefono = /^[\+]?[0-9]{4}?[-\s\.]?[0-9]{4}$/im;

    if (validarTelefono.test(inputTelefono.value) == false) {
        error = true;
        inputTelefono.classList.add('error');
    } else {
        inputTelefono.classList.remove('error');
    }

    if (inputNombreCompleto.value == 0) {
        error = true;
        inputNombreCompleto.classList.add('error');
    } else {
        inputNombreCompleto.classList.remove('error');
    }

    if (!validarFecha(inputFechaDeNacimiento.value)) {
        error = true;
        inputFechaDeNacimiento.classList.add('error');
    } else {
        inputFechaDeNacimiento.classList.remove('error');
    }

    if (inputGenero.value == 0) {
        error = true;
        inputGenero.classList.add('error');
    } else {
        inputGenero.classList.remove('error');
    }

    return error;
};

let resetForm = () => {
    inputTelefono.value = '';
    inputNombreCompleto.value = '';
    inputFechaDeNacimiento.value = '';
    inputGenero.value = '';
};

let obtenerDatos = async () => {
    
    let telefono = inputTelefono.value;
    let nombreCompleto = inputNombreCompleto.value;
    let fechaDeNacimiento = inputFechaDeNacimiento.value;
    let genero = inputGenero.value;

    if (validar()) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'OK'
        })
    } else {
        let contrasenna = generarContrasena();

        let edad = validarFecha(fechaDeNacimiento);

        let errorCorreo = await verificarCorreo(correoURL);

        if(!errorCorreo) {
            inputCorreoElectronico.classList.add('error');
            Swal.fire({
                icon: 'warning',
                title: 'El usuario ya ha sido registrado',
                text: 'Inténtelo de nuevo',
                confirmButtonText: 'Entendido'
            });
        } else {
            let resultado = await registrarEncargado(correoURL, telefono, nombreCompleto, fechaDeNacimiento, genero, contrasenna);
        
            if (!resultado.resultado) {

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
                        window.location.href = 'iniciar-sesion.html';
                    }
                });
            }

        }

        resetForm();

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

let validarFecha = (fechaDeNacimiento) => {

    let resultado = false;

    let hoy = new Date();
    let cumpleannos = new Date(fechaDeNacimiento);
    let edad = hoy.getFullYear() - cumpleannos.getFullYear();
    let m = hoy.getMonth() - cumpleannos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() <= cumpleannos.getDate())) {
        edad--;
    }

    if(edad >= 18) {
        resultado = true;
    } 

    return resultado;

}

btnRegistrar.addEventListener('click', obtenerDatos);