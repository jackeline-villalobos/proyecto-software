'use strict';

let registrar_usuario = async(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, genero,provincia, canton, distrito, direccion) => {
    let resultado;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-usuario',
        responseType: 'json',
        data: {
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            correo: correo,
            fechaDeNacimiento: fechaDeNacimiento,
            genero: genero,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion: direccion
            //contrasenna: contrasenna
        }
    })

    .then(async function(res) {
            console.log(res.data);
            resultado= await res.data;
        })
        .catch(function(error) {
            console.log(error)
        });

    return resultado;

};

    