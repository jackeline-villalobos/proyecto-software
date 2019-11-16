"use strict";

let registrar_empresa = async(nombreEmpresa, razonSocial, cedulaJuridica, telefono, direccion, provincia, canton, distrito, imagen) => {
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
                direccion: direccion,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
                imagen: imagen


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