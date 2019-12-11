"use strict";

const correoUsuario = sessionStorage.getItem("correoUsuarioPerfil");
const inputCorreoUsuario = document.querySelector("#correoUsuario")


const btnActivar = document.querySelector('#btn-activar');
const btnDesactivar = document.querySelector('#btn-desactivar');

const btnBanear = document.querySelector('#btn-banear');
const btnDesbanear = document.querySelector('#btn-desbanear');

inputCorreoUsuario.innerHTML = correoUsuario;
inputCorreoUsuario.classList.add("correoUsuario-css");



btnActivar.addEventListener('click', async function() {
    let estado = 'activo';

    let resultado = await modificarEstado(correo, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El usuario ha sido activado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuario');
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

    let resultado = await modificarEstado(correo, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El usuario ha sido desactivado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuario');
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

    let resultado = await modificarBaneo(correo, baneado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El usuario ha sido baneado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuario');
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


btnDesbanear.addEventListener('click', async function() {
    let baneado = true;

    let resultado = await modificarBaneo(correo, baneado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El usuario ha sido desbaneado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('correoUsuario');
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