'use strict';

const input_fecha = document.querySelector('#txt-date-1');
const input_hora = document.querySelector('#txt-time-1');
const input_asistentes = document.querySelector('#txt-cantidadAsistentes');

const input_nombreDescuento = document.querySelector('#txt-nombreDescuento');
const input_porcentajeDescuento = document.querySelector('#txt-porcentajeDescuento');

const slt_impuestos = document.querySelector('#slt-impuestos');
const input_porcentajeImpuesto = document.querySelector('#txt-porcentajeImpuesto');

const btn_guardar = document.querySelector('#btn-registrar-evento');
const btn_agregarFecha = document.querySelector('#btn-agregarFecha');
const btn_agregarDescuento = document.querySelector('#btn-agregarDescuento');
const btn_agregarImpuesto = document.querySelector('#btn-agregarImpuesto');


let validarFechas = () => {

    let error = false;

    if (input_fecha.value == '') {
        error = true;
        input_fecha.classList.add('error');
    } else {
        input_fecha.classList.remove('error');
    };

    if (input_hora.value == '') {
        error = true;
        input_hora.classList.add('error');
    } else {
        input_hora.classList.remove('error');
    };

    if (input_asistentes.value == '') {
        error = true;
        input_asistentes.classList.add('error');
    } else {
        input_asistentes.classList.remove('error');
    };

    return error;
};

let validarDescuentos = () => {
    let error = false;
    if (input_nombreDescuento.value == '') {
        error = true;
        input_nombreDescuento.classList.add('error');
    } else {
        input_nombreDescuento.classList.remove('error');
    };

    if (input_porcentajeDescuento.value == '') {
        error = true;
        input_porcentajeDescuento.classList.add('error');
    } else {
        input_porcentajeDescuento.classList.remove('error');
    };
    return error;
};

let validarImpuestos = () => {
    let error = false;
    if (slt_impuestos.value == '') {
        error = true;
        slt_impuestos.classList.add('error');
    } else {
        slt_impuestos.classList.remove('error');
    };
    return error;
};

let resetFecha = () => {
    input_fecha.value = '';
    input_hora.value = '';
    input_asistentes.value = '';
};
let resetDescuentos = () => {
    input_nombreDescuento.value = '';
    input_porcentajeDescuento.value = '';
};
let resetImpuestos = () => {
    slt_impuestos.value = '';
    input_porcentajeImpuesto = '';
};

let agregarFecha = () => {

    let fecha = input_fecha.value;
    let hora = input_hora.value;
    let asistentes = input_asistentes.value;

    if(validarFechas()){
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })
    }else{
        agregar_fecha(fecha, hora, asistentes);
        resetFecha();
    }
};

let agregarDescuento= ()=>{
    let nombreDescuento = input_nombreDescuento.value;
    let porcentajeDescuento = input_porcentajeDescuento.value;
    if(validarDescuentos()){
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })
    }else{
        agregar_descuento(nombreDescuento, porcentajeDescuento);
        resetDescuentos();
    }
};

let agregarImpuestos = () => {

    let nombreImpuesto = slt_impuestos.value;
    let porcentajeImpuesto = input_porcentajeImpuesto.value;

    if (validarImpuestos()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })

    } else {
        agregar_impuesto(nombreImpuesto, porcentajeImpuesto);
        resetImpuestos();
    }

};

let finalizar =()=>{
    Swal.fire({
        type: 'success',
        title: 'Datos ingresados con éxito',
        text: 'El evento ha sido almacenado',
        confirmButtonText: 'Continuar',
        onClose: function () {
            location.href = 'registrar-evento.html';
        }
    });
};

let listaImpuestos;

let llenarImpuestos = async () => {
    listaImpuestos = await listarImpuestos();
    for (let i = 0; i < listaImpuestos.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = listaImpuestos[i]['nombre']
        slt_impuestos.appendChild(option)
    }
};

llenarImpuestos();

btn_agregarFecha.addEventListener('click', agregarFecha);
btn_agregarDescuento.addEventListener('click', agregarDescuento);
btn_agregarImpuesto.addEventListener('click', agregarImpuestos);
btn_guardar.addEventListener('click', finalizar);