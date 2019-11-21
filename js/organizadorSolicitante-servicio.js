'use strict';

let registrar_organizadorSolicitante = async (nombreEmpresa, cedulaJuridica, experiencia,
    nombreComercial, provincia, canton, distrito, sennas, nombreCompleto,
    correo, telefono, genero) => {

    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-organizadorSolicitante',
            responseType: 'json',
            data: {
                nombreEmpresa: nombreEmpresa,
                cedulaJuridica: cedulaJuridica,
                experiencia: experiencia,
                nombreComercial: nombreComercial,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
                sennas: sennas,
                nombreCompleto: nombreCompleto,
                correo: correo,
                telefono: telefono,
                genero: genero
            }
        }
    )
    .then(function(res){
        console.log(res.data);
    })
    
    .catch(function(error){
        console.log(error);
    });

};