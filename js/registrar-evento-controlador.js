'use strict';

const input_nombre = document.querySelector('#txt-nombre');
const input_tipoDeEventos = document.querySelector('#txt-tipoDeEventos');
const input_pais = document.querySelector('#txt-pais');
const input_lugar = document.querySelector('#txt-lugar');
const input_cantidadAsistentes = document.querySelector('#txt-cantidadAsistentes');
const input_fecha1 = document.querySelector('#txt-date-1');
const input_hora1 = document.querySelector('#txt-time-1');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_precioEntrada = document.querySelector('#txt-precioEntrada');
const input_impuestos = document.querySelector('#txt-impuestos');
const input_descuentos = document.querySelector('#txt-descuentos');
const input_imagen = document.querySelector('#imagePreview');
const btn_guardar = document.querySelector('#btn-guardar-registrar-evento');
const btn_agregarFecha = document.querySelector('#btn-agregarFecha');

const div_fechaYHora = document.querySelector('.fechaYHora');

const input_fechas = document.querySelector('.txt-date');
const input_horas = document.querySelector('.txt-time');

let validar = () => {

    let error = false;

    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error');
    } else {
        input_nombre.classList.remove('error');
    };

    if (input_tipoDeEventos.value == '') {
        error = true;
        input_tipoDeEventos.classList.add('error');
    } else {
        input_tipoDeEventos.classList.remove('error');
    };

    if (input_pais.value == '') {
        error = true;
        input_pais.classList.add('error');
    } else {
        input_pais.classList.remove('error');
    };

    if (input_lugar.value == '') {
        error = true;
        input_lugar.classList.add('error');
    } else {
        input_lugar.classList.remove('error');
    };

    if (input_cantidadAsistentes.value == '') {
        error = true;
        input_cantidadAsistentes.classList.add('error');
    } else {
        input_cantidadAsistentes.classList.remove('error');
    };

    if (input_fechas.value == '') {
        error = true;
        input_fechas.classList.add('error');
    } else {
        input_fechas.classList.remove('error');
    };

    if (input_horas.value == '') {
        error = true;
        input_horas.classList.add('error');
    } else {
        input_horas.classList.remove('error');
    };

    if (input_descripcion.value == '') {
        error = true;
        input_descripcion.classList.add('error');
    } else {
        input_descripcion.classList.remove('error');
    };

    if (input_precioEntrada.value == '') {
        error = true;
        input_precioEntrada.classList.add('error');
    } else {
        input_precioEntrada.classList.remove('error');
    };

    if (input_impuestos.value == '') {
        error = true;
        input_impuestos.classList.add('error');
    } else {
        input_impuestos.classList.remove('error');
    };

    if (input_imagen.src == 'imagenes/registrar-evento/outlined_placeholder-512.png') {
        error = true;
        input_imagen.classList.add('error');
    } else {
        input_imagen.classList.remove('error');
    };

    return error;
};

let resetForm = () => {
    input_nombre.value = '';
    input_pais.value = '';
    input_cantidadAsistentes.value = '';
    input_fechas.value = '';
    input_tipoDeEventos.value = '';
    input_lugar.value = '';
    input_precioEntrada.value = '';
    input_horas.value = '';
    input_descripcion.value = '';
    input_impuestos.value = '';
    input_descuentos.value = '';
    input_imagen.src = "imagenes/registrar-evento/outlined_placeholder-512.png";
};

let obtener_datos = () => {

    let nombre = input_nombre.value;
    let pais = input_nombre.value;
    let cantidadAsistentes = input_cantidadAsistentes.value;
    let tipoDeEventos = input_tipoDeEventos.value;
    let lugar = input_lugar.value;

    let fecha = input_fecha1.value;
    let hora = input_hora1.value;
    
    let precioEntrada = input_precioEntrada.value;
    let descripcion = input_descripcion.value;
    let impuestos = input_impuestos.value;
    let descuentos = input_descuentos.value;
    let imagen = imagePreview.src;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })

    } else {
        registrar_evento(nombre, tipoDeEventos, pais, lugar, cantidadAsistentes, precioEntrada, descripcion, impuestos, fecha, hora, descuentos, imagen);
        
        Swal.fire({
            type: 'success',
            title: 'Registro realizado con éxito',
            text: 'El evento ha sido almacenado',
            confirmButtonText: 'Entendio'
        });
        // agregar_fecha(fecha, hora);
        resetForm();
        
    }
};

var i = 2;
let agregarEspacioFecha = () => {

    let dateh4 = document.createElement('h6')
    dateh4.id = 'txt-dateh4-' + i;
    dateh4.innerText = 'Fecha ' + i;

    let date = document.createElement('input');
    date.type = "date";
    date.id = "txt-date-" + i;
    date.classList.add('txt-date');

    let time = document.createElement('input');
    time.type = "time";
    time.id = "txt-time-" + i; 
    time.classList.add('txt-time');

    div_fechaYHora.appendChild(dateh4);
    div_fechaYHora.appendChild(date);
    div_fechaYHora.appendChild(time);
    
    event.preventDefault();
    i++;
};

// listar descuentos e impuestos try

const dtl_descuentos = document.querySelector('#listaDescuentos');

let listarImpuestos = async () => {

    listaDescuentos = await listarDescuentos();

    for(i = 0; i < listarDescuentos; i ++){
        let option = document.createElement('option');
        option.classList.add('opcionDescuentos')
        option.innerHTML(listarEventos[i]);
    };
    listarDescuentos.appendChild('opcionDescuentos');

};


btn_guardar.addEventListener('click', obtener_datos);
btn_agregarFecha.addEventListener('click', agregarEspacioFecha);
