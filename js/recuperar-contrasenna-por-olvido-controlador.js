
'use strict';


const inputDireccionCorreo = document.querySelector('#txt-direccionCorreo');


const btnEnviar = document.querySelector('#btn-enviar');


//obtener datoss

let validar = () => {

    let error = false;
    let revisarCorreo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    


    if (inputDireccionCorreo.value == 0) {
        error = true;
        inputDireccionCorreo.classList.add('error');
    } else {
        inputDireccionCorreo.classList.remove('error');
    };

    if (revisarCorreo.test(inputDireccionCorreo.value) == false) {
        error = true;
        inputDireccionCorreo.classList.add('error');
    } else {
        inputDireccionCorreo.classList.remove('error');
    }


    return error


};


let obtenerDatos = async() => {
    
    let correo = inputDireccionCorreo.value;
    

    if (validar()) {
        Swal.fire({
            icon: 'warning',
            title: 'El campo está vacío o incompleto.',
            text: 'Por favor llenar el campo correctamente.',
            confirmButtonText: 'Entendido'
        })

    } else {
        let error = await enviarContrasennaPreviamenteGuardada(correo);

        if (error.resultado == false) {

            Swal.fire({
                icon: 'warning',
                // type: 'warning',
                title: 'No tenemos registrada esa dirección de correo electrónico.',
                text: 'Por favor ingrese la dirección de correo con la que se registró.',
                confirmButtonText: 'Entendido'
            });

        } else {

            // sessionStorage.setItem('idNuevoUsuario', error.data._id);


            Swal.fire({
                icon: 'success',
                title: 'Contraseña enviada con éxito',
                text: 'Revise su correo electrónico.',
                confirmButtonText: 'Entendido',
                costumClass: 'modal',
                onClose: function() {
                    // sessionStorage.removeItem('contrasenna');
                    location.href = 'iniciar-sesion.html';
                }
                
                // onClose: function() {
                //     location.href = 'primer-cambio-contrasenna.html';
                // }
            },
            // function(confirmButtonText){
            //     window.location.href = "iniciar-sesion.html";
            // }
            );

            
            // input_primerNombre.value = '';
            // input_segundoNombre.value = '';
            // input_primerApellido.value = '';
            // input_segundoApellido.value = '';
            // input_correo.value = '';
            // input_FechaDeNacimiento.value = '';
            // input_genero.value = '';
            // slt_provicias.value = '';
            // slt_cantones.value = '';
            // slt_distritos.value = '';
            // input_direccion.value = ''


        }


    };
}


btnEnviar.addEventListener('click', obtenerDatos);

//forma 1

// let recuperarContrasennaEmail = async(email) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: `http://localhost:3000/api/recuperar-contrasenna-email/${email}`,
//             responseType: 'json'
//         });
//         return response.data.cliente;
//     }catch (error){
//         console.log(error);
//     }
// };

//forma 2
// let recuperarContrasennaEmail = async(email) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             params: { email: email },
//             url: `http://localhost:3000/api/recuperar-contrasenna`,
//             responseType: 'json'
//         });
//         return response.data.cliente;
//     }catch (error){
//         console.log(error);
//     }
// };

// recuperarContrasennaEmail('prodriguezc@ucenfotec.ac.cr');