'use strict';

const btnBotonParaRegistrarse = document.querySelector('#btn-registrarse');

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');


const btnIniciarSesionConCredenciales = document.querySelector('#btn-iniciarSesionConCredenciales');


console.log(inputDireccionCorreo);
console.log(inputContrasenna);



// console.log(direccionCorreo);

// console.log(contrasenna);

let registrarse = () =>{
    window.location.href = 'registrar-usuario.html'

}

let obtenerDatos = () => {
    let direccionCorreo = inputDireccionCorreo.value;
    let contrasenna = inputContrasenna.value;

    console.log('dirección de correo: ', direccionCorreo);
    console.log('contraseña: ', contrasenna);

    let errorBlancos = validar(direccionCorreo, contrasenna);
    let usuarioAceptado = false;

    if(!errorBlancos){
        usuarioAceptado = validarCredenciales(direccionCorreo, contrasenna);
        if(usuarioAceptado){
            window.location.href = 'sesion-iniciada.html'
        }
    }
};

let validar = (direccionCorreo, contrasenna) => {
    let error = false;

    if(direccionCorreo == ''){
        error = true;
        inputDireccionCorreo.classList.add('errorInput');
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    }else{
        inputDireccionCorreo.classList.remove('errorInput');
    }

    if(contrasenna == ''){
        error = true;
        inputContrasenna.classList.add('errorInput');
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    }else{
        inputContrasenna.classList.remove('errorInput');
    }

    return error;
};

//Eventos asociados a los botones o inputs

btnBotonParaRegistrarse.addEventListener('click' , registrarse)

btnIniciarSesionConCredenciales.addEventListener('click', obtenerDatos);


 