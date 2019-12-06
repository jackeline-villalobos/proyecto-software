'use strict'

const input_primerCodigo = document.querySelector('#primer-codigo');
const input_nuevaContrasenna = document.querySelector('#contrasenna-nueva');
const input_verificarContrasenna = document.querySelector('#verificar-contrasenna');
const btn_cambiarContrasenna = document.querySelector('#btn-cambiarContrasenna');

const idUsuario = sessionStorage.getItem('idUsuario');
const contrasenna = sessionStorage.getItem('contrasenna');

let validar = () => {
    let error = false;

    if (input_primerCodigo.value == 0) {
        error = true;
        input_primerCodigo.classList.add('error');
    } else {
        input_primerCodigo.classList.remove('error');
    }

    if (input_nuevaContrasenna.value == 0) {
        error = true;
        input_nuevaContrasenna.classList.add('error');
    } else {
        input_nuevaContrasenna.classList.remove('error');
    }

    if (input_verificarContrasenna.value == 0) {
        error = true;
        input_verificarContrasenna.classList.add('error');
    } else {
        input_verificarContrasenna.classList.remove('error');
    }


    //Verificar contraseñas

    if(input_nuevaContrasenna !== input_verificarContrasenna){
        error = true;
        input_nuevaContrasenna.classList.add('error');
        input_verificarContrasenna.classList.add('error');

        console.log('Las contraseñas nuevas no coinciden');
    }else{
        input_nuevaContrasenna.classList.remove('error');
        input_verificarContrasenna.classList.remove('error');
    }

}
