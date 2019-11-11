'use strict';

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');
const inputContraseña = document.querySelector('#txt-contraseña');

const btnIniciarSesionConCredenciales = document.querySelector('#btn-iniciarSesionConCredenciales');


console.log(inputDireccionCorreo);
console.log(inputContraseña);



// console.log(direccionCorreo);

// console.log(contraseña);



let obtenerDatos = () => {
    let direccionCorreo = inputDireccionCorreo.value;
    let contraseña = inputContraseña.value;

    console.log('dirección de correo: ', direccionCorreo);
    console.log('contraseña: ', contraseña);


};


//Eventos asociados a los botones o inputs

btnIniciarSesionConCredenciales.addEventListener('click', obtenerDatos);


 