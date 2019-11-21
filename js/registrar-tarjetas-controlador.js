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

let tipoTarjeta = (numeroTarjeta) => {
    let marca = 'vacio';

    let tarjetaAmericanExpress = (numeroTarjeta) => {
        let numero = /^(?:3[47][0-9]{13})$/;

        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }


    let tarjetaVisa = (numeroTarjeta) => {
        let numero = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }
    }

    let tarjetaMasterCard = (numeroTarjeta) => {
        let numero = /^(?:5[1-5][0-9]{14})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }
    }

    let tarjetaDiscover = (numeroTarjeta) => {
        let numero = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    let tarjetaDinnersClub = (numeroTarjeta) => {
        let numero = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    let tarjetaJCB = (numeroTarjeta) => {
        let numero = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    if (tarjetaAmericanExpress(numeroTarjeta)) {
        marca = 'American Express';
    }

    if (tarjetaVisa(numeroTarjeta)) {
        marca = 'Visa';
    }

    if (tarjetaMasterCard(numeroTarjeta)) {
        marca = 'MasterCard';
    }

    if (tarjetaDiscover(numeroTarjeta)) {
        marca = 'Discover';
    }

    if (tarjetaDinnersClub(numeroTarjeta)) {
        marca = 'Dinners Club';
    }

    if (tarjetaJCB(numeroTarjeta)) {
        marca = 'JCB';
    }

    return marca;
}

let obtenerDatos = () => {
    const _id = sessionStorage.getItem('idUsuario');
    const numeroTarjeta = inputNumeroTarjeta.value;
    const fechaExpiracion = inputFechaExpiracion.value;
    const codigoSeguridad = inputCodigoSeguridad.value;
    let marca = tipoTarjeta(numeroTarjeta);

    if(validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos son incorrectos',
            text: 'Por favor, inténtelo de nuevo',
            confirmButtonText: 'Ententido'
        });

    } else if (marca == 'vacio') {
        Swal.fire({
            icon: 'warning',
            title: 'Ingresa un número de tarjeta válido',
            text: 'Inténtalo de nuevo'
        });

    } else {
        
        registrarTarjeta(_id ,marca, numeroTarjeta, fechaExpiracion, codigoSeguridad);

        Swal.fire({
            icon: 'success',
            title: 'Se agregó la tarjeta correctamente',
            confirmButtonText: 'Entendido'
        });
    }


    inputNumeroTarjeta.value = '';
    inputFechaExpiracion.value = '';
    inputCodigoSeguridad.value = '';

}


btnGuardar.addEventListener('click', obtenerDatos);

