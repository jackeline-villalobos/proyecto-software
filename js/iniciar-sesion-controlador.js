'use strict';

const inputCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');
const btnIngresar = document.querySelector('#btn-ingresar');

// const enlaceOlvidasteContrasenna = document.querySelector('#enlace-OlvidasteContrasenna')


let validar = () => {
    let error = false;

    if (inputCorreo.value == 0) {
        error = true;
        inputCorreo.classList.add('error');
    } else {
        inputCorreo.classList.remove('error');
    }

    if (inputContrasenna.value == 0) {
        error = true;
        inputContrasenna.classList.add('error');
    } else {
        inputContrasenna.classList.remove('error');
    }

    return error;
}

// let validarDireccionCorreoParaContrasennaOlvidada = () => {
//     let error = false;

//     if(inputCorreo.value == 0) {
//         error = true;
//         inputCorreo.classList.add('error');
//     } else {
//         inputCorreo.classList.remove('error');
//     }

//     return error;

// }


let obtenerDatos = async() => {
    const correo = inputCorreo.value;
    const contrasenna = inputContrasenna.value;

    if (validar()) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        });

    } else {
        let res = await iniciarSesion(correo, contrasenna);
        if (res.resultado) {
            let grado = sessionStorage.getItem('gradoUsuario');
            if (grado == 2) {
                window.location.href = 'perfil-encargado.html';
            } else {
                window.location.href = 'index.html';
            }


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

// let obtenerDireccionCorreo = async () => {
//     const correo = inputCorreo.value;

//     if(validarDireccionCorreoParaContrasennaOlvidada()){
//         Swal.fire({
//             icon: 'warning',
//             title: 'Por favor escribe tu dirección de correo electrónico.',
//             confirmButtonText: 'Entendido'
//         });
//     }else{
//         let res = await correoCorrectoParaRecuperarContrasenna(correo);

//         if(res.resultadoParaRecuperarContrasenna){
//             window.location.href = 'cambiar-contrasenna-por-olvido.html'
//         }else{
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'No tenemos registrada esa dirección de correo electrónico.',
//                 text: 'Por favor inténtalo de nuevo.',
//                 confirmButtonText: 'Entendido'
//             });
//         }
//     }
// }

// enlaceOlvidasteContrasenna.addEventListener('click', obtenerDireccionCorreo);
btnIngresar.addEventListener('click', obtenerDatos);


// btnIngresar.querySelector('#btnIngresar').addEventListener('keydown', function(e) {
//             var key = e.which || e.keyCode;
//             if (key === 13) {
//                 obtenerDatos();
//             };
//         };