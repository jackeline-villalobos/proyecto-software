'use strict';

const botonesHeader = document.querySelectorAll('#btns-header a');
const btnCerrarSesion = document.querySelector('#btn-cerrarSesion');
let conectado = sessionStorage.getItem('conectado');

//let gradoUsuario = sessionStorage.getItem('gradoUsuario');

if (conectado) {
    botonesHeader[0].classList.add('ocultar');
    botonesHeader[1].classList.add('ocultar');
} else {
    botonesHeader[2].classList.add('ocultar');
    botonesHeader[3].classList.add('ocultar');
}

let cerrarSesion = () => {
    sessionStorage.clear();
    //window.location.href = 'iniciar-sesion.html';
}

btnCerrarSesion.addEventListener('click', cerrarSesion);