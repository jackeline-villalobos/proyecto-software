'use strict';

let registrarDescuento = async (nombre, porcentaje) => {
    let resultado;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-descuento',
        responseType: 'json',
        data: {
            nombre: nombre,
            porcentaje: porcentaje
        }
    })
    .then(async function(res){
        console.log(res.data);
        resultado = await res.data;
    })
    .catch(function(error){
        console.log(error);
    });

    return resultado;
}

let listarDescuentos = async () => {

    let listaDescuentos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-descuentos',
        responseType: 'json'
    })
    .then(function(res){
        console.log(res.data);
        listaDescuentos = res.data.descuentos;
    })
    .catch(function(error){
        console.log(error);
    })

    return listaDescuentos;
}