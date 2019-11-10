'use strict';

let registrar_usuario = async(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, direccion) =>{
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-evento',
            responseType: 'json',
            data:{
                PrimerNombre: primerNombre,
                segundoNombre: segundoNombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo,
                fechaDeNacimiento: fechaDeNacimiento,
                direccion: direccion
            }
        }
    )

    .then(function(res){
        console.log(res.data);
    })
    .catch(function(error){
        console.log(error)
    });

};

