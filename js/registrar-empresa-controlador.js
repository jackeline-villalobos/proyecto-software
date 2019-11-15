'use strict';

const input_nombreEmpresa = document.querySelector('#txt-nombreEmpresa');
const input_razonSocial = document.querySelector('#txt-razonSocial');
const input_cedulaJuridica = document.querySelector('#txt-cedulaJuridica');
const input_telefono = document.querySelector('#txt-telefono');
const input_direccion = document.querySelector('#direcciones');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');

// Falta el logo


const btn_guardar = document.querySelector('#btn-registrar');


let validar = () => {
    let error = false;
    let errorCodigo;
    let validarTelefono = /^[\+]?[0-9]{4}?[-\s\.]?[0-9]{4}$/im;


    if (input_nombreEmpresa.value == "" || input_nombreEmpresa.value == " ") {
        error = true;
        input_nombreEmpresa.classList.add("error");
        errorCodigo = 1;
    } else {
        input_nombreEmpresa.classList.remove("error");
    };

    if (input_razonSocial.value == "" || input_razonSocial.value == " ") {
        error = true;
        input_razonSocial.classList.add("error");
        errorCodigo = 2;
    } else {
        input_razonSocial.classList.remove("error");
    };

    if (input_cedulaJuridica.value == "" || input_cedulaJuridica == " ") {
        error = true;
        input_cedulaJuridica.classList.add("error");
        errorCodigo = 3;
    } else {
        input_cedulaJuridica.classList.remove("error");
    };

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

    return error;



};


let resetForm = () => {
    input_nombreEmpresa.value = '';
    input_razonSocial.value = '';
    input_cedulaJuridica.value = '';
    input_telefono.value = '';
    input_direccion.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
};
let obtener_datos = () => {

    let nombreEmpresa = input_nombreEmpresa.value;
    let razonSocial = input_razonSocial.value;
    let cedulaJuridica = input_cedulaJuridica.value;
    let telefono = input_telefono.value;
    let direccion = input_direccion.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;



    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos no se ingresaron correctamente.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'OK'
        })


    } else {

        registrar_empresa(nombreEmpresa, razonSocial, cedulaJuridica, telefono, direccion, provincia, canton, distrito);

        Swal.fire({
            icon: 'success',
            title: 'Registro realizado con éxito',
            text: 'El usuario ha sido almacenado',
            confirmButtonText: 'OK'
        });
        resetForm();
    }
};

btn_guardar.addEventListener('click', obtener_datos);