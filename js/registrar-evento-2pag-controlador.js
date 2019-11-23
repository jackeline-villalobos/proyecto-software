'use strict';

const input_fecha1 = document.querySelector('#txt-date-1');
const input_hora1 = document.querySelector('#txt-time-1');
const input_asistentes = document.querySelector('#txt-cantidadAsistentes');

const input_nombreDescuento = document.querySelector('#txt-nombreDescuento');
const input_porcentajeDescuento = document.querySelector('#txt-porcentajeDescuento');

const slt_impuestos = document.querySelector('#slt-impuestos');
const input_porcentajeImpuesto = document.querySelector('#txt-porcentajeImpuesto');

const input_fechas = document.querySelector('.txt-date');
const input_horas = document.querySelector('.txt-time');

const btn_guardar = document.querySelector('#btn-registrar-evento');


let validar = () => {

    let error = false;

    if(input_fecha1.value == ''){
        error = true;
        input_fecha1.classList.add('error');
    } else {
        input_fecha1.classList.remove('error');
    };

    if(input_hora1.value == ''){
        error = true;
        input_hora1.classList.add('error');
    } else {
        input_hora1.classList.remove('error');
    };

    if(input_asistentes.value == ''){
        error = true;
        input_asistentes.classList.add('error');
    } else {
        input_asistentes.classList.remove('error');
    };

    if(input_nombreDescuento.value == ''){
        error = true;
        input_nombreDescuento.classList.add('error');
    } else {
        input_nombreDescuento.classList.remove('error');
    };

    if(input_porcentajeDescuento.value == ''){
        error = true;
        input_porcentajeDescuento.classList.add('error');
    } else {
        input_porcentajeDescuento.classList.remove('error');
    };

    if(slt_impuestos.value == ''){
        error = true;
        slt_impuestos.classList.add('error');
    } else {
        slt_impuestos.classList.remove('error');
    };

    return error;
};

let resetForm = () => {

    input_fecha1.value = '';
    input_hora1.value = '';
    input_asistentes.value = '';
    input_nombreDescuento.value = '';
    input_porcentajeDescuento.value = '';
    slt_impuestos.value = '';
    //input_porcentajeImpuesto = '';

};

let agregarDatos = () => {

    let fecha1 = input_fecha1.value;
    let hora1 = input_hora1.value;
    let nombreDescuento = input_nombreDescuento.value;
    let porcentajeDescuento = input_porcentajeDescuento.value;
    let impuestos = slt_impuestos.value;
    let porcentajeImpuesto = input_porcentajeImpuesto.value;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })

    } else {
        
        console.log(fecha1, hora1, nombreDescuento, porcentajeDescuento, impuestos, porcentajeImpuesto);

        Swal.fire({
            type: 'success',
            title: 'Datos ingresados con éxito',
            text: 'El evento ha sido almacenado',
            confirmButtonText: 'Continuar',
            onClose: function() {
                location.href = 'registrar-evento-2pag.html';
            }
        });
        
        resetForm();

    }
    

};

let listaImpuestos;

let llenarImpuestos = async () => {
    listaImpuestos = await listarImpuestos();
    for(let i = 0; i < listaImpuestos.length; i++){
        let option = document.createElement('option')
        option.innerHTML = listaImpuestos[i]['nombre']
        slt_impuestos.appendChild(option)
    }
};

llenarImpuestos();

btn_guardar.addEventListener('click', agregarDatos);