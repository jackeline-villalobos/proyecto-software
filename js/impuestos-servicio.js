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

let buscarImpuesto = async(_id) => {
    let impuesto;
    await axios({
        method: 'get',
        url: `http://localhost:3000/api/buscar-impuesto-id/${_id}`,
        responseType: 'json'
    })
    .then( async function(res){
        //console.log(res.data);
        impuesto = await res.data;
    })
    .catch(function(err){
        console.log(err);
    });

    return impuesto;
}

let modificarImpuesto = async (_id, nombre, porcentaje) => {

    let resultado;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/modificar-impuesto',
        responseType: 'json',
        data: {
            _id: _id,
            nombre: nombre,
            porcentaje: porcentaje
        }
    })
    .then( async function(res){
        console.log(res.data);
        resultado = await res.data; 
    })
    .catch(function(err){
        console.log(err);
    });

    return resultado;
}