"use strict";

const correoUsuario = sessionStorage.getItem("correoUsuarioPerfil");
const foto_perfil = sessionStorage.getItem("fotoUsuario");
const container_fotoPerfil = document.querySelector('#foto_container');
const inputCorreoUsuario = document.querySelector("#correoUsuario");


const btnActivar = document.querySelector('#btn-activar');
const btnDesactivar = document.querySelector('#btn-desactivar');

const btnBanear = document.querySelector('#btn-banear');
const btnDesbanear = document.querySelector('#btn-desbanear');

inputCorreoUsuario.innerHTML = correoUsuario;
inputCorreoUsuario.classList.add("correoUsuario-css");

let idUsuarioPerfil = sessionStorage.getItem("idUsuarioPerfil");

let estadoUsuarioPerfil = sessionStorage.getItem("estadoUsuarioPerfil");
let baneadoUsuarioPerfil = sessionStorage.getItem("baneadoUsuarioPerfil");

//foto perfil

let foto = foto_perfil;
let img = document.createElement('img');
img.src = `${foto}`;
img.classList.add('foto_perfil');
container_fotoPerfil.appendChild(img);


/*
let obtenerFoto = () => {
    let usuarioData = await buscarUsuario(correoUsuario);
    console.log(usuarioData);
    let fotoUsuario = usuarioData.imagen;
    console.log(fotoUsuario);
}
*/

let validarEstados = () => {

    //inputNombre.setAttribute('placeholder', `${nombretipoEvento}`);


    if (estadoUsuarioPerfil == "activo") {
        btnActivar.classList.add("btn-estado")

    }
    if (estadoUsuarioPerfil == "inactivo") {
        btnDesactivar.classList.add("btn-estado")
    }

    if (baneadoUsuarioPerfil == "true") {
        btnBanear.classList.add("btn-estado");
    }
    if (baneadoUsuarioPerfil == "false") {
        btnDesbanear.classList.add("btn-estado");
    }

}


btnActivar.addEventListener('click', async function() {
    let estado = 'activo';

    let resultado = await modificarEstado(idUsuarioPerfil, estado);


    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El usuario ha sido activado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuarioPerfil');
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El usuaruo no se ha podido activar',
            confirmButtonText: "Entendido"
        });

    }

});


btnDesactivar.addEventListener('click', async function() {
    let estado = 'inactivo';

    let resultado = await modificarEstado(idUsuarioPerfil, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Desactivado con éxito',
            text: 'El usuario ha sido desactivado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuarioPerfil');
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El usuario no se ha podido desactivar',
            confirmButtonText: "Entendido"
        });

    }

});



btnBanear.addEventListener('click', async function() {
    let baneado = true;

    let resultado = await modificarBaneo(idUsuarioPerfil, baneado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Baneado con éxito',
            text: 'El usuario ha sido baneado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuarioPerfil');
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El usuario no se ha podido banear',
            confirmButtonText: "Entendido"
        });

    }

});


btnDesbanear.addEventListener('click', async function() {
    let baneado = true;

    let resultado = await modificarBaneo(idUsuarioPerfil, baneado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Desbaneado con éxito',
            text: 'El usuario ha sido desbaneado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuarioPerfil');
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El usuario no se ha podido desbanear',
            confirmButtonText: "Entendido"
        });

    }

});


obtenerFoto();
validarEstados();