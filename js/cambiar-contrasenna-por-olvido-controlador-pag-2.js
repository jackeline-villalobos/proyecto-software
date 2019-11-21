'use strict';

const inputCodigoSeguridad = document.querySelector('#txt-codigoSeguridad');
const inputContrasennaNueva = document.querySelector('#psw-contrasennaNueva');
const inputVerificacionContrasennaNueva = document.querySelector('#psw-verificacionContrasennaNueva');

const btnCambiarContrasenna = document.querySelector('#btn-cambiarContrasenna');


let validar = () => {
    let error = false;
    
    if(inputCodigoSeguridad.value == 0) {
        error = true;
        inputCodigoSeguridad.classList.add('error');
    } else {
        inputCodigoSeguridad.classList.remove('error');
    }

    if(inputContrasennaNueva.value == 0) {
        error = true;
        inputContrasennaNueva.classList.add('error');
    } else {
        inputContrasennaNueva.classList.remove('error');
    }

    if(inputVerificacionContrasennaNueva.value == 0) {
        error = true;
        inputVerificacionContrasennaNueva.classList.add('error');
    } else {
        inputVerificacionContrasennaNueva.classList.remove('error');
    }

    return error;
}

let obtenerDatos = () => {
    const codigoSeguridadEscrito = inputCodigoSeguridad.value;
    const contrasennaNueva = inputContrasennaNueva.value;
    const verificacionContrasennaNueva = inputVerificacionContrasennaNueva.value;

    if(validar()) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran incompletos o son incorrectos.',
            text: 'Por favor intentálo de nuevo.',
            confirmButtonText: 'Entendido'
        });
    }else{
        if(codigoSeguridadRecibido === codigoSeguridadEscrito && contrasennaNueva === verificacionContrasennaNueva){
            contrasenna = contrasennaNueva;
            Swal.fire({
                icon: 'success',
                title: 'Contraseña cambiada con éxito.',
                text: 'Si querés, ¡iniciá sesión con tu nueva contraseña!',
                confirmButtonText: 'Entendido'
            });     
        }
    }    

}


// let obtenerDatos = async () => {
//     const codigoSeguridad = inputCodigoSeguridad.value;
//     const contrasennaNueva = inputContrasennaNueva.value;
//     const verificacionContrasennaNueva = inputVerificacionContrasennaNueva.value;

//     if(validar()) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Algunos campos se encuentran incompletos o son incorrectos.',
//             text: 'Por favor intentálo de nuevo.',
//             confirmButtonText: 'Entendido'
//         });

//     } else {
//         let res = await cambiarContrasenna(codigoSeguridad, contrasennaNueva, verificacionContrasennaNueva);

//         if(res.resultado) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Contraseña cambiada con éxito.',
//                 text: 'Si querés, ¡iniciá sesión con tu nueva contraseña!',
//                 confirmButtonText: 'Entendido'
//             });        
//         } else {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Ingrese datos correctos.',
//                 text: 'Por favor inténtelo de nuevo.',
//                 confirmButtonText: 'Entendido'
//             });
//         }
//     }
// }


btnCambiarContrasenna.addEventListener('click', obtenerDatos);