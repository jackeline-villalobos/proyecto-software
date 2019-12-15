'use strict';

let registrarTarjeta = async(_id, marca, numeroTarjeta, fechaExpiración, codigoSeguridad) => {

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-tarjeta',
            responseType: 'json',
            data: {
                _id: _id,
                marca: marca,
                numero: numeroTarjeta,
                fechaExpiracion: fechaExpiración,
                codigoSeguridad: codigoSeguridad
            }
        })
        .then(function(res) {
            console.log(res.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

let listarTarjetas = async() => {
    let tarjetas;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-usuarios',
            responseType: 'json'
        })
        .then(async function(res) {
            //console.log(res.data.clientes);
            tarjetas = await res.data.clientes;
        })
        .catch(function(error) {
            console.log(error)
        });

    return tarjetas;
}