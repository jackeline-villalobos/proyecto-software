'use strict';

const btnBotonParaRegistrarse = document.querySelector('#btn-registrarse');

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');


const btnIniciarSesionConCredenciales = document.querySelector('#btn-iniciarSesionConCredenciales');



// console.log(direccionCorreo);

// console.log(contrasenna);



let obtenerDatos = () => {
    let direccionCorreo = inputDireccionCorreo.value;
    let contrasenna = inputContrasenna.value;

    console.log('dirección de correo: ', direccionCorreo);
    console.log('contraseña: ', contrasenna);

    let errorBlancos = validar(direccionCorreo, contrasenna);
    let usuarioAceptado = false;

    if (errorBlancos) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    }
    usuarioAceptado = validarCredenciales(direccionCorreo, contrasenna);

    // for(let i = 0; i<listaUsuarios.lenght; i++){
    //     let correo = listaUsuarios[i]['correo'].lowerCase;
    //     let contrasenna = listaUsuarios[i]['contrasenna'];

    //     if(correo && contrasenna == )
    // }













    // if (!errorBlancos) {
       
    //     if (usuarioAceptado) {
    //         window.location.href = 'sesion-iniciada.html'
    //     }
    // }
};

let validar = (direccionCorreo, contrasenna) => {
    let error = false;

    if (direccionCorreo == 0) {
        error = true;
        inputDireccionCorreo.classList.add('errorInput');

    } else {
        inputDireccionCorreo.classList.remove('errorInput');
    }

    if (contrasenna == 0) {
        error = true;
        inputContrasenna.classList.add('errorInput');
    
    } else {
        inputContrasenna.classList.remove('errorInput');
    }

    return error;
};

//Eventos asociados a los botones o inputs


btnIniciarSesionConCredenciales.addEventListener('click', obtenerDatos);


