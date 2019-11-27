'use strict';

const input_nombre = document.querySelector('#txt-nombre');
const input_tipoDeEventos = document.querySelector('#txt-tipoDeEventos');
const input_pais = document.querySelector('#txt-pais');
const input_lugar = document.querySelector('#txt-lugar');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_precioEntrada = document.querySelector('#txt-precioEntrada');
const input_imagen = document.querySelector('#imagePreview');
const btn_guardar = document.querySelector('#btn-guardar-registrar-evento');

const get_creador = sessionStorage.getItem('idUsuario');


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
    let creador = get_creador;
    let imagen = imagePreview.src;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incorrectos.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendio'
        })

    } else {
        registrar_evento(nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, creador, imagen);

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

 
let listaTipoEventos;

let llenarTipoEventos = async () => {
    listaTipoEventos = await listartipoEventos();
    for(let i = 0; i < listaTipoEventos.length; i++){
        let option = document.createElement('option')
        option.innerHTML = listaTipoEventos[i]['nombre']
        input_tipoDeEventos.appendChild(option)
    }
};

let listaRecintos;

let llenarRecintos = async () => {
    listaRecintos = await listarRecintos();
    for(let i = 0; i < listaRecintos.length; i++){
        let option = document.createElement('option')
        option.innerHTML = listaRecintos[i]['nombreRecinto']
        input_lugar.appendChild(option)
    }
};

llenarRecintos();
llenarTipoEventos();

btn_guardar.addEventListener ('click', obtener_datos)

// btn_agregarFecha.addEventListener('click', agregarEspacioFecha);
