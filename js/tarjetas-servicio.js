'use strict';

let registrarTarjeta = async (_id ,numeroTarjeta, fechaExpiración, codigoSeguridad) => {

    let marca;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/tipo-tarjeta',
        responseType: 'json',
        data: {
            numero: numeroTarjeta
        }
    })
    .then(function(res){
        marca = res.data.marca;
        console.log(res.data.marca);
    })
    .catch(function(error){
        console.log(error);
    });

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/agregar-tarjeta',
        responseType: 'json',
        data: {
            _id: _id,
            marca: marca,
            numero: numeroTarjeta,
            fechaExpiración: fechaExpiración,
            codigoSeguridad: codigoSeguridad
        }
    })
    .then(function(res){
        console.log(res.data);
    })
    .catch(function(error){
        console.log(error);
    });
}
