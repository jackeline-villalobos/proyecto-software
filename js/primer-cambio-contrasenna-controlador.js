'use strict'

const input_primerCodigo = document.querySelector('#primer-codigo');
const input_nuevaContresenna = document.querySelector('#contrasenna-nueva');
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

    if (input_nuevaContresenna.value == 0) {
        error = true;
        input_nuevaContresenna.classList.add('error');
    } else {
        input_nuevaContresenna.classList.remove('error');
    }

    if (input_verificarContrasenna.value == 0) {
        error = true;
        input_verificarContrasenna.classList.add('error');
    } else {
        input_verificarContrasenna.classList.remove('error');
    }


    //Verificar contraseñas

    if(input_nuevaContresenna !== input_verificarContrasenna){

        input_nuevaContresenna.classList.remove('error');
        input_verificarContrasenna.classList.remove('error');
        console.log('Las contraseñas nuevas coinciden')

    }else{

        error = true;
        input_nuevaContresenna.classList.add('error');
        input_verificarContrasenna.classList.add('error');

        console.log('Las contraseñas nuevas no coinciden');
    }

    /*if(input_primerCodigo.value !== contrasenna){
        error = true;
        input_primerCodigo.classList.add('error');
        console.log('Contraseña incorrecta');
    }else {
        input_primerCodigo.classList.remove('error');
    }*/

    return error;

}

let obtenerDatos = async () =>{
    let nuevaContresenna = input_nuevaContresenna.value;

    if(validar()){
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        })
    }else{
        let error = await cambiarContrasenna(idUsuario, nuevaContresenna);

        if(error.resultado == false){
            Swal.fire({
                icon: 'warning',
                title: 'La información del perfil no se ha podido editar correctamente',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: 'Entendido'
            })
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados con éxito',
                text: 'La información del perfil ha sido modificado',
                confirmButtonText: "Entendido",
                onClose: function() {
                    sessionStorage.removeItem('nuevaContresenna');
                    location.href = 'perfil-usuario.html';
                }
            });
        }

    }
}

btn_cambiarContrasenna.addEventListener('click', obtenerDatos);