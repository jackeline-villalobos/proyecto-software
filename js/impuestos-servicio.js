'use strict';

let registrarImpuesto = async(nombre, porcentaje) => {
    let resultado;
    await axios (
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-impuesto',
            responseType: 'json',
            //body
            data: {
                nombre: nombre,
                porcentaje: porcentaje
            }
        }

    )
    .then(async function(res){
        console.log(res.data);
        resultado = await res.data;
    })
    .catch(function(error){
        console.log(error);
    });
    
    return resultado;
};

let listarImpuestos = async() => {

    let listaImpuestos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuestos',
        responseType: 'json'
    })
    .then(function(res) {
        console.log(res.data);
        listaImpuestos = res.data.impuestos;
    })
    .catch(function(error){
        console.log(error);
    });

    return listaImpuestos;

};