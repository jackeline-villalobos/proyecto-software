'use strict';

const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');

const sbtEnviarCodigoSeguridad = document.querySelector('#sbt-enviarCodigoSeguridad');

const btnSiguiente = document.querySelector('#btn-siguiente')

console.log(generarCodigoSeguridad());


let validar = () => {
    let error = false;
    let revisarCorreo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    
    if(inputDireccionCorreo.value == 0) {
        error = true;
        inputDireccionCorreo.classList.add('error');
    } else {
        inputDireccionCorreo.classList.remove('error');
    }

    if (revisarCorreo.test(inputDireccionCorreo.value) == false) {
        error = true;
        inputDireccionCorreo.classList.add('error');
    } else {
        inputDireccionCorreo.classList.remove('error');
    }

    return error;
}


let obtenerDatos = async () => {
    const correo = inputDireccionCorreo.value;


    if(validar()){
        Swal.fire({
            icon: 'warning',
            title: 'El campo está vacío o incompleto.',
            text: 'Por favor llenar el campo correctamente.',
            confirmButtonText: 'Entendido'
        });
    }else{
        
        let res = await enviarCodigoSeguridad(correo);

        if(res.resultado){
            // window.open('mailto:pablorodriguezcastro@outlook.com'); 
            //sendMail("Hola mundo")
            generarCodigoSeguridad();
            Swal.fire({
                icon: 'warning',
                title: generarCodigoSeguridad(),
                text: 'Por favor inténtalo de nuevo.',
                confirmButtonText: 'Entendido'
            });
            console.log(generarCodigoSeguridad());
            
            window.location.href = 'cambiar-contrasenna-por-olvido-pag-2.html'
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'No tenemos registrada esa dirección de correo electrónico.',
                text: 'Por favor inténtalo de nuevo.',
                confirmButtonText: 'Entendido'
            });
        }
    }
}

// function receiveMail() {
//     var link = "mailto:me@example.com"
//              + "?cc=myCCaddress@example.com"
//              + "&subject=" + escape("This is my subject")
//              + "&body=" + escape(document.getElementById('myText').value)
//     ;

//     window.location.href = link;
// }


sbtEnviarCodigoSeguridad.addEventListener('click', obtenerDatos);
btnSiguiente.addEventListener('click', obtenerDatos);





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
//             window.location.href = 'cambiar-contrasenna-por-olvido-pag-2.html'
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
// btnEnviarCodigoSeguridad.addEventListener('click', obtenerDatos);
