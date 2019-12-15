"use strict";


let verificarCorreoEncargado = async(correo) => {
    let resultado;

    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/verificar-correo-recinto/${correo}`,
            responseType: 'json'
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data.resultado;
        })
        .catch(function(error) {
            console.log(error);
        })

    return resultado;

}

let registrar_recinto = async(nombreRecinto, capacidad, capacidadDiscapacitados, correoEncargado, direccion, provincia, canton, distrito, imagen, latitud, longitud) => {
    let resultado;

    // await axios({
    //     method: 'get',
    //     url: 'http://localhost:3000/api/buscar-encargado',
    //     responseType: 'json'
    // })
    // .then(function(res){
    //     console.log(res.data);
    // })
    // .catch(function(error){
    //     console.log(error);  
    // });

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-recinto',
            responseType: 'json',
            data: {
                nombreRecinto: nombreRecinto,
                capacidad: capacidad,
                capacidadDiscapacitados: capacidadDiscapacitados,
                correoEncargado: correoEncargado,
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
            console.log(res.data);
            resultado = await res.data;

        })
        .catch(function(error) {
            console.log(error);

        });

    return resultado;

};

let listarRecintos = async() => {
    let listaRecintos;

    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-recintos',
            responseType: 'json'
        })
        .then(function(res) {
            listaRecintos = res.data.recintos;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaRecintos;
};

let buscarRecinto = async(idRecinto) => {
    let recinto;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-recinto-id',
            responseType: 'json',
            data: {
                _id: idRecinto
            }
        })
        .then(async function(res) {
            //console.log(res.data);
            recinto = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });

    return recinto;
}

let modificarRecinto = async(idRecinto, imagenCloudinary, encargado, recinto, capacidad, capacidadEspeciales, provincia, direccion, latitud, longitud) => {
    let resultado;

    let parametro = {
        '_id': idRecinto,
        'imagen': imagenCloudinary,
        'correoEncargado': encargado,
        'nombreRecinto': recinto,
        'capacidad': capacidad,
        'capacidadDiscapacitados': capacidadEspeciales,
        'provincia': provincia,
        'direccion': direccion,
        'latitud': latitud,
        'longitud': longitud
    }


    for (let i in parametro) {
        if (parametro[i] === '') {
            delete parametro[`${i}`];
        }
    }


    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-recinto',
            responseType: 'json',
            data: {
                parametro
            }
        })
        .then(async function(res) {
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        })

    return resultado;
}

let modificarEstado = async(_id, estado) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-estado-recinto',
            responseType: 'json',
            data: {
                _id: _id,
                estado: estado
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data
        })
        .catch(function(error) {
            console.log(error);
        });


    return resultado;
}