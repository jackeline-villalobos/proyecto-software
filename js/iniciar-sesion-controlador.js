'use strict';

//const btnBotonParaRegistrarse = document.querySelector('#btn-registrarse');

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');
const inputContrasenna = document.querySelector('#txt-contrasenna');


const btnIniciarSesionConCredenciales = document.querySelector('#btn-iniciarSesionConCredenciales');



// console.log(direccionCorreo);

// console.log(contrasenna);



let obtenerDatos = () => {
    let direccionCorreo = inputDireccionCorreo.value;
    let contrasenna = inputContrasenna.value;

    // console.log('dirección de correo: ', direccionCorreo);
    // console.log('contraseña: ', contrasenna);

    let errorBlancos = validar(direccionCorreo, contrasenna);
    let usuarioAceptado = validarCredencialesControlador(direccionCorreo, contrasenna);


    if (errorBlancos) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos se encuentran incompletos.',
            text: 'Por favor revise los campos en rojo.',
            confirmButtonText: 'Entendido'
        })
    }else{
        if (usuarioAceptado) {
            window.location.href = 'ejemplo.html'
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Dirección de correo y/o contraseña incorrecta.',
                text: 'Por favor escriba los datos de su cuenta correctamente.',
                confirmButtonText: 'Entendido'
            })
        }

    }
    // if (!errorBlancos) {
       
    //     if (usuarioAceptado) {
    //         window.location.href = 'ejemplo.html'
    //     }
    // }
};

let validar = (direccionCorreo, contrasenna) => {
    let error = false;

    if (direccionCorreo == 0) {
        error = true;
        inputDireccionCorreo.classList.add('error');

    } else {
        inputDireccionCorreo.classList.remove('error');
    }

    if (contrasenna == 0) {
        error = true;
        inputContrasenna.classList.add('error');
    
    } else {
        inputContrasenna.classList.remove('error');
    }


    let revisarCorreo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    if(revisarCorreo.test(inputDireccionCorreo.value) == false){
        error = true;  
        inputDireccionCorreo.classList.add('error');
        
    }else{
        inputDireccionCorreo.classList.remove('error');
    }

    return error;
};


let validarCredencialesControlador = async(direccionCorreo, contrasenna) =>{

    let listaUsuarios = await listarUsuarios();

    let usuarioAceptado = false;


    for(let i = 0; i<listaUsuarios.lenght; i++){


        let direccionCorreoCorrecta = listaUsuarios[i]['correo'].lowerCase;
        let contrasennaCorrecta = listaUsuarios[i]['contrasenna'];

        
        if(direccionCorreo === direccionCorreoCorrecta && contrasenna === contrasennaCorrecta){
            inputDireccionCorreo.classList.remove('error');
            usuarioAceptado = true;
            // window.location.href = 'perfil-usuario.html'
        }else{
            inputDireccionCorreo.classList.add('error');
            // Swal.fire({
            //     icon: 'warning',
            //     title: 'Dirección de correo y/o contraseña incorrecta.',
            //     text: 'Por favor escriba los datos de su cuenta correctamente.',
            //     confirmButtonText: 'Entendido'
    
             
            // })
        }
    }

    return usuarioAceptado;
}

// let validarDireccionCorreo = (direccionCorreo) =>{
    
// }

//Eventos asociados a los botones o inputs


btnIniciarSesionConCredenciales.addEventListener('click', obtenerDatos);


