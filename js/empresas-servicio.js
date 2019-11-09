"use strict";

let registrar_empresa = async(nombreEmpresa, razonSocial, cedulaJuridica, telefono, direccion, provincia, canton, distrito) => {
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
                distrito: distrito

            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });

};