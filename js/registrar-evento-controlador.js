'use strict';

const input_nombre = document.querySelector('#txt-nombre');
const input_tipoDeEventos = document.querySelector('#txt-tipoDeEventos');
const input_pais = document.querySelector('#txt-pais');
const input_lugar = document.querySelector('#txt-lugar');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_precioEntrada = document.querySelector('#txt-precioEntrada');
const input_imagen = document.querySelector('#imagePreview');
const btn_guardar = document.querySelector('#btn-guardar-registrar-evento');

// const btn_agregarFecha = document.querySelector('#btn-agregarFecha');



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
    input_tipoDeEventos.value = '';
    input_lugar.value = '';
    input_precioEntrada.value = '';
    input_descripcion.value = '';
    input_imagen.src = "imagenes/registrar-evento/outlined_placeholder-512.png";
};

let obtener_datos = () => {

    let nombre = input_nombre.value;
    let pais = input_nombre.value;
    let tipoDeEventos = input_tipoDeEventos.value;
    let lugar = input_lugar.value;
    let precioEntrada = input_precioEntrada.value;
    let descripcion = input_descripcion.value;
    let imagen = imagePreview.src;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })

    } else {
        registrar_evento(nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, imagen);

        Swal.fire({
            type: 'success',
            title: 'Registro realizado con éxito',
            text: 'El evento ha sido almacenado',
            confirmButtonText: 'Entendio'
        });
        
        resetForm();

    }
};
var x = 2;
let agregarEspacioFecha = () => {

    let dateh4 = document.createElement('h6')
    dateh4.id = 'txt-dateh4-' + x;
    dateh4.innerText = 'Fecha ' + x;

    let date = document.createElement('input');
    date.type = "date";
    date.id = "txt-date-" + x;
    date.classList.add('txt-date');

    let time = document.createElement('input');
    time.type = "time";
    time.id = "txt-time-" + x;
    time.classList.add('txt-time');

    let asistentes = document.createElement('input');
    asistentes.type = "number";
    asistentes.id = "txt-asistentes-" + x;
    asistentes.classList.add('txt-asistentes');

    div_fechaYHora.appendChild(dateh4);
    div_fechaYHora.appendChild(date);
    div_fechaYHora.appendChild(time);
    div_fechaYHora.appendChild(asistentes);

    event.preventDefault();
    x++;
};

// listar descuentos e impuestos try


// const dtl_impuestos = document.querySelector('#listaImpuestos')

// let llenarImpuestos = async () => {

//     listaImpuestos = await listarImpuestos();

//     for(let i = 0; i < listarImpuestos.length; i++){
//         let option = document.createElement('option');
//         option.classList.add('opcionImpuestos');
//         option.setAttribute.value(listarImpuestos[i]['nombre']);
//         dtl_impuestos.appendChild(option);
//     }
    
// };



btn_guardar.addEventListener('click', obtener_datos);
// btn_agregarFecha.addEventListener('click', agregarEspacioFecha);
