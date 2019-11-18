"use strict";

const inputCorreoElectronico = document.querySelector('#txt-correoElectronico');
const inputTelefono = document.querySelector('#txt-telefono');
const inputNombreCompleto = document.querySelector('#txt-nombreCompleto');
const inputFechaDeNacimiento = document.querySelector('#txt-edad');
const inputGenero = document.querySelector('#txt-genero');

const btnRegistrar = document.querySelector('#btn-registrar');


let validar = () => {
    let error = false;
    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    if (inputCorreoElectronico.value == 0) {
        error = true;
        inputCorreoElectronico.classList.add('error')
    } else {
        inputCorreoElectronico.classList.remove('error');
    }

    if (revisar_correo.test(inputCorreoElectronico.value) == false) {
        error = true;
        inputCorreoElectronico.classList.add('error');
    } else {
        inputCorreoElectronico.classList.remove('error');
    }

    if (inputTelefono.value == "" || inputTelefono.value.length > 8 || inputTelefono.value == " ") {
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

    if (inputFechaDeNacimiento.value <= 17) {
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
    inputCorreoElectronico.value = '';
    inputTelefono.value = '';
    inputNombreCompleto.value = '';
    inputFechaDeNacimiento.value = '';
    inputGenero.value = '';
};

let obtenerDatos = () => {
    let correoElectronico = inputCorreoElectronico.value;
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

        registrarEncargado(correoElectronico, telefono, nombreCompleto, fechaDeNacimiento, genero);

        Swal.fire({
            icon: 'success',
            title: 'Registro realizado con éxito.',
            text: 'El tipo de evento ha sido almacenado.',
            confirmButtonText: "OK"
        })

    resetForm();

    }
};

btnRegistrar.addEventListener('click', obtenerDatos);