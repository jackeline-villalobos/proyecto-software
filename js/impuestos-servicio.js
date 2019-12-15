'use strict';

let registrarImpuesto = async(nombre, porcentaje) => {
    let resultado;
    await axios({
                method: 'post',
                url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-impuesto',
                responseType: 'json',
                //body
                data: {
                    nombre: nombre,
                    porcentaje: porcentaje
                }
            }

        )
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });

    return resultado;
};

let listarImpuestos = async() => {

    let listaImpuestos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-impuestos',
            responseType: 'json'
        })
        .then(function(res) {
            console.log(res.data);
            listaImpuestos = res.data.impuestos;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaImpuestos;

};

let buscarImpuesto = async(_id) => {
    let impuesto;
    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/buscar-impuesto-id/${_id}`,
            responseType: 'json'
        })
        .then(async function(res) {
            //console.log(res.data);
            impuesto = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return impuesto;
}

let modificarImpuesto = async(_id, nombre, porcentaje) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-impuesto',
            responseType: 'json',
            data: {
                _id: _id,
                nombre: nombre,
                porcentaje: porcentaje
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let modificarEstadoImpuesto = async(_id, estado) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-estado-impuesto',
            responseType: 'json',
            data: {
                _id: _id,
                estado: estado
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let eliminarImpuesto = async(_id) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/eliminar-impuesto',
            responseType: 'json',
            data: {
                _id: _id
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}