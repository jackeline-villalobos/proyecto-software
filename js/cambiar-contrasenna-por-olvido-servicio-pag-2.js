'use strict';

let cambiarContrasenna = async(codigoSeguridad, contrasennaNueva, verificacionContrasennaNueva) => {
    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/iniciar-sesion',
            responseType: 'json',
            data: {

                contrasenna: contrasennaNueva,

            }
        })
        .then(async function(res) {
            resultado = await res.data;
            console.log(res.data);

            if (res.data.resultado) {
                sessionStorage.setItem('conectado', res.data.resultado);
                sessionStorage.setItem('IdUsuario', res.data.usuario._id);
                //sessionStorage.setItem('gradoUsuario', res.data.usuario.grado);
            }

        })
        .catch(function(error) {
            console.log(error);
        });

    return resultado;
}


'use strict';

// let registrar_usuario = async(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, genero,provincia, canton, distrito, direccion,imagen) => {
//     let resultado;
//     let pcontrasenna = generarContrasena();

//     await axios({
//         method: 'post',
//         url: 'http://localhost:3000/api/registrar-usuario',
//         responseType: 'json',
//         data: {
//             primerNombre: primerNombre,
//             segundoNombre: segundoNombre,
//             primerApellido: primerApellido,
//             segundoApellido: segundoApellido,
//             correo: correo,
//             fechaDeNacimiento: fechaDeNacimiento,
//             genero: genero,
//             provincia: provincia,
//             canton: canton,
//             distrito: distrito,
//             direccion: direccion,
//             contrasenna: pcontrasenna,
//             imagen : imagen
//         }
//     })

//     .then(async function(res) {
//             console.log(res.data);
//             resultado= await res.data;
//         })
//         .catch(function(error) {
//             console.log(error)
//         });

//     return resultado;

// };