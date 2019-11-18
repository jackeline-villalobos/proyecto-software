'use strict'

const input_primerCodigo = document.querySelector('#primer-codigo');
const input_nuevaContrasenna = document.querySelector('#contrasenna-nueva');
const input_verificarContrasenna = document.querySelector('#verificar-contrasenna');
const btn_cambiarContrasenna = document.querySelector('#btn-cambiarContrasenna');

let validar = () => {
    let error = false;

    if (input_primerCodigo.value == 0) {
        error = true;
        input_primerCodigo.classList.add('error');
    } else {
        input_primerCodigo.remove('error');
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

    if (input_nuevaContrasenna.value !== input_verificarContrasenna.value) {
        error = true;
        input_verificarContrasenna.classList.add('error');
        input_nuevaContrasenna.classList.add('error');
        console.log('Las contraseñas son diferentes');
    } else {
        input_nuevaContrasenna.classList.remove('error');
        input_verificarContrasenna.classList.remove('error');
    }
}

let obtener_datos = async () => {

    let codigo = input_primerCodigo.value;
    let nuevaContrasenna = input_nuevaContrasenna.value;
    let verificarContrasenna = input_verificarContrasenna.value;


    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    } else {
        let error = await cambiar_contrasenna(codigo, nuevaContrasenna);

        if (error.resultado == false) {
            Swal.fire({
                type: 'warning',
                title: 'Algunos de los campos se encuentran incompletos',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: 'Entendido'
            })
        } else {
            Swal.fire({
                type: 'success',
                title: 'Cambio de contraseña realizado con éxito',
                text: 'La contraseña ha sido modificada',
                confirmButtonText: 'Entendido',
                costumClass: 'modal',
                onClose: function () {
                    location.href = '';
                }
            });

            input_primerCodigo.value = '';
            input_nuevaContrasenna.value = '';
            input_verificarContrasenna.value = '';
        }
    };

}

btn_cambiarContrasenna.addEventListener('click', obtener_datos);