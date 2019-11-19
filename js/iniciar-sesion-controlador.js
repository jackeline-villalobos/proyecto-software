'use strict';

const inputCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');
const btnIngresar = document.querySelector('#btn-ingresar');


let validar = () => {
    let error = false;
    
    if(inputCorreo.value == 0) {
        error = true;
        inputCorreo.classList.add('error');
    } else {
        inputCorreo.classList.remove('error');
    }

    if(inputContrasenna.value == 0) {
        error = true;
        inputContrasenna.classList.add('error');
    } else {
        inputContrasenna.classList.remove('error');
    }

    return error;
}


let obtenerDatos = async () => {
    const correo = inputCorreo.value;
    const contrasenna = inputContrasenna.value;

    if(validar()) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        });

    } else {
        let res = await iniciarSesion(correo, contrasenna);

        if(res.resultado) {
            window.location.href = 'index.html';
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Ingrese datos correctos',
                text: 'Por favor inténtelo de nuevo',
                confirmButtonText: 'Entendido'
            });
        }
    }
}


btnIngresar.addEventListener('click', obtenerDatos);