'use strict';
const inputNumeroTarjeta = document.querySelector('#txt-numeroTarjeta');
const inputFechaExpiracion = document.querySelector('#txt-fechaExpiracion');
const inputCodigoSeguridad = document.querySelector('#txt-codigoSeguridad');
const btnGuardar = document.querySelector('#btn-guardar');

let validar = () => {
    let error = false;

    if(inputNumeroTarjeta.value.length > 16) {
        error = true;
        inputNumeroTarjeta.classList.add('error');
    } else {
        inputNumeroTarjeta.classList.remove('error');
    } 

    if(inputFechaExpiracion.value == 0){
        error = true;
        inputFechaExpiracion.classList.add('error');
    } else {
        inputFechaExpiracion.classList.remove('error');
    } 

    if(inputCodigoSeguridad.value.length > 4) {
        error = true;
        inputCodigoSeguridad.classList.add('error');
    } else {
        inputCodigoSeguridad.classList.remove('error');
    }

    return error;
}



let obtenerDatos = () => {
    const numeroTarjeta = inputNumeroTarjeta.value;
    const fechaExpiracion = inputFechaExpiracion.value;
    const codigoSeguridad = inputCodigoSeguridad.value;

    if(validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos son incorrectos',
            text: 'Por favor, inténtelo de nuevo',
            confirmButtonText: 'Ententido'
        });
    } else {

        registrarTarjeta(_id ,numeroTarjeta, fechaExpiracion, codigoSeguridad);

        Swal.fire({
            icon: 'success',
            title: 'Se agregó la tarjeta con éxito',
            confirmButtonText: 'Entendido'
        });
    }

    inputNumeroTarjeta.value = '';
    inputFechaExpiracion.value = '';
    inputCodigoSeguridad.value = '';

}


btnGuardar.addEventListener('click', obtenerDatos);

