"use strict";

let registrar_empresa = async(nombreEmpresa, razonSocial, cedulaJuridica, telefono, correo, direccion, provincia, canton, distrito, imagen, latitud, longitud) => {
    let error;

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrar-empresa',
            responseType: 'json',
            data: {
                nombreEmpresa: nombreEmpresa,
                razonSocial: razonSocial,
                cedulaJuridica: cedulaJuridica,
                telefono: telefono,
                correo: correo,
                direccion: direccion,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
                imagen: imagen,
                latitud: latitud,
                longitud: longitud


            }
        })
        .then(async function(res) {
            console.log(res.data.resultado);
            error = await res.data.resultado;

        })
        .catch(function(error) {
            console.log(error);

        });

    return error;

};