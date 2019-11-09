'use strict';

const input_nombreEmpresa = document.querySelector('#txt-nombreEmpresa');
const input_razonSocial = document.querySelector('#txt-razonSocial');
const input_cedulaJuridica = document.querySelector('#txt-cedulaJuridica');
const input_telefono = document.querySelector('#txt-telefono');
const input_direccion = document.querySelector('#txt-direccion');
const input_datalist_provincia = document.querySelector('#txt-datalist-provincia');
const input_canton = document.querySelector('#txt-datalist-canton');
const input_distrito = document.querySelector('#txt-datalist-distrito');
// Falta el logo


const btn_guardar = document.querySelector('#btn-guardar');


let validar = () => {
    let error = false;

    if (input_nombreEmpresa.value == "") {
        error = true;
        input_nombreEmpresa.classList.add("error");
    } else {
        input_nombreEmpresa.classList.remove("error");
    };

    if (input_razonSocial.value == "") {
        error = true;
        input_razonSocial.classList.add("error");
    } else {
        input_razonSocial.classList.remove("error");
    };

    if (input_cedulaJuridica.value == "") {
        error = true;
        input_cedulaJuridica.classList.add("error");
    } else {
        input_cedulaJuridica.classList.remove("error");
    };

    if (input_telefono.value == "" || input_telefono.value.length < 8) {
        error = true;
        input_telefono.classList.add("error");
    } else {
        input_telefono.classList.remove("error");
    };

    if (input_direccion.value == "") {
        error = true;
        input_direccion.classList.add("error");
    } else {
        input_direccion.classList.remove("error");
    };

    if (input_datalist_provincia.value == "") {
        error = true;
        input_datalist_provincia.classList.add("error");
    } else {
        input_datalist_provincia.classList.remove("error");
    };

    if (input_canton.value == "") {
        error = true;
        input_canton.classList.add("error");
    } else {
        input_canton.classList.remove("error");
    };

    if (input_distrito.value == "") {
        error = true;
        input_distrito.classList.add("error");
    } else {
        input_distrito.classList.remove("error");
    };

    return error;



};


let resetForm = () => {
    input_nombre.value = '';
    input_fecha.value = '';
    input_tipo_de_eventos = '';
    input_lugar = '';
    input_hora = '';
    input_descripcion = '';
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
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendido'
        })

    } else {
        registrar_evento(nombre, fecha, tipo_de_eventos, lugar, hora, descripcion);
        Swal.fire({
            type: 'success',
            title: 'Registro realizado con éxito',
            text: 'El usuario ha sido almacenado',
            confirmButtonText: 'Entendido'
        });
        resetForm();
    }
};

btn_guardar.addEventListener('click', obtener_datos);