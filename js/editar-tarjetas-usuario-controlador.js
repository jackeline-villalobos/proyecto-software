'use strict';
const inputNumeroTarjeta = document.querySelector('#txt-numeroTarjeta');
const inputFechaExpiracion = document.querySelector('#txt-fechaExpiracion');
const inputCodigoSeguridad = document.querySelector('#txt-codigoSeguridad');
const btnGuardar = document.querySelector('#btn-guardar');
const btnActivar = documento.querySelector('#btn_activarTarjeta');
const btnDesactivar = document.querySelector('#btn_desactivarTarjeta');
const btnEliminar = document.querySelector('#btn_eliminarTarjeta');


let _id = sessionStorage.getItem('idUsuario');


let validarExpiracion = (fecha) => {
    let mes = fecha.substr(0, 2);
    let anno = fecha.substr(-2, 2);

    console.log(mes);
    console.log(anno);

    let mesHoy = 11;
    let annoHoy = 19;

    if (mes > 12) {
        return false;
    } else if (mes >= mesHoy && anno == annoHoy && mes <= 12) {
        return true;
    } else if (anno > annoHoy && mes <= 12) {
        return true;
    } else {
        return false;

    }
}

let validar = () => {
    let error = false;

    if (inputNumeroTarjeta.value.length > 16) {
        error = true;
        inputNumeroTarjeta.classList.add('error');
    } else {
        inputNumeroTarjeta.classList.remove('error');
    }

    if (!validarExpiracion(inputFechaExpiracion.value)) {
        error = true;
        inputFechaExpiracion.classList.add('error');
    } else {
        inputFechaExpiracion.classList.remove('error');
    }

    if (inputCodigoSeguridad.value.length > 3) {
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

    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor, inténtelo de nuevo',
            confirmButtonText: 'Ententido'
        });

    } else if (marca == 'vacio') {
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese un número de tarjeta válido',
            text: 'Inténtalo de nuevo'
        });

    } else {

        let error = await editarInformacionTarjeta(_id, numeroTarjeta, fechaExpiracion, codigoSeguridad, marca);

        if (error.resultado == false) {
            Swal.fire({
                icon: 'warning',
                title: 'La información de la tarjeta no se ha podido editar correctamente',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: 'Entendido'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados con éxito',
                text: 'La información de la tarjeta ha sido editada',
                confirmButtonText: "Entendido",
                onClose: function () {
                    sessionStorage.removeItem('numeroTarjeta');
                    sessionStorage.removeItem('fechaExpiracion');
                    sessionStorage.removeItem('codigoSeguridad');
                    sessionStorage.removeItem('marca');
                    location.href = 'listar-tarjetas.html';
                }
            });
        }
    }


    inputNumeroTarjeta.value = '';
    inputFechaExpiracion.value = '';
    inputCodigoSeguridad.value = '';

}

btnGuardar.addEventListener('click', obtenerDatos);

//Activar tarjeta

btnActivar.addEventListener('click', async function (e) {
    e.preventDefault();

    let estado = 'activo';
    let error = await editarEstadoTarjeta(ObjectId, estado);

    console.log(error);

    if (error.resultado) {
        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'La tarjeta ha sido activada',
            confirmButtonText: 'Entendido',
            onClose: function () {
                location.href = 'editar-tarjetas-usuario.html';
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No se ha podido activar la tarjeta',
            confirmButtonText: 'Entendido'
        });
    }
});

//Desactivar impuestos

btnDesactivar.addEventListener('click', async function (e) {
    e.preventDefault();

    let estado = 'inactivo';

    let error = await editarEstadoTarjeta(ObjectId, estado);

    console.log(error);

    if (error.resultado) {
        Swal.fire({
            icon: 'success',
            title: 'Desactivado con éxito',
            text: 'La tarjeta ha sido desactivada',
            confirmButtonText: 'Entendido',
            onClose: function () {
                location.href = 'listar-impuestos.html';
            }
        });
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'No se ha podido desactivar la tarjeta',
            confirmButtonText: 'Entendido'
        });
    }
});