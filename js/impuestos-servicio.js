'use strict';

let registrarImpuesto = async(nombre, porcentaje) => {
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
    .then(function(res){
        console.log(res.data);
    })
    .catch(function(error){
        console.log(error);
    });
    
};

let listarImpuestos = async() => {
    let listaImpuestos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuestos',
        responseType: 'json'
    })
    .then(function(req, res) {
        listaImpuestos = res.data.impuesto;
    })
    .catch(function(error){
        console.log(error);
    })

};