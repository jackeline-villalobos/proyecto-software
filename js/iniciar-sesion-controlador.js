'use strict';

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');

const btnIniciarSesionConCredenciales = document.querySelector('#btn-iniciarSesionConCredenciales');


console.log(inputDireccionCorreo);
console.log(inputContrasenna);



// console.log(direccionCorreo);

// console.log(contrasenna);



let obtenerDatos = () => {
    let direccionCorreo = inputDireccionCorreo.value;
    let contrasenna = inputContrasenna.value;

    console.log('dirección de correo: ', direccionCorreo);
    console.log('contraseña: ', contrasenna);


};


//Eventos asociados a los botones o inputs

btnIniciarSesionConCredenciales.addEventListener('click', obtenerDatos);


 