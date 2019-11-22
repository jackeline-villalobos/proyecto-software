'use strict';
const header = document.querySelector('#btns-header');
const botonesHeader = document.querySelectorAll('#btns-header a');
const btnCerrarSesion = document.querySelector('#btn-cerrarSesion');
let conectado = sessionStorage.getItem('conectado');

let containerFoto = document.querySelector('#foto-usuario');

let fotoUsuario = document.createElement('img');
let imagenUsuario = sessionStorage.getItem('fotoUsuario');
fotoUsuario.src = `${imagenUsuario}`;

containerFoto.appendChild(fotoUsuario);


//botonesHeader[4].appendChild(perfilUsuario);


    if (conectado) {
        botonesHeader[0].classList.add('ocultar');
        botonesHeader[1].classList.add('ocultar');
    
    } else {
        botonesHeader[2].classList.add('ocultar');
        botonesHeader[3].classList.add('ocultar');
        botonesHeader[4].classList.add('ocultar');
    }



let cerrarSesion = () => {
    sessionStorage.clear();
    //window.location.href = 'iniciar-sesion.html';
}

btnCerrarSesion.addEventListener('click', cerrarSesion);