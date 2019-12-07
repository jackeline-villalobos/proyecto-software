"use strict";


let verificarCorreoEncargado = async (correo) => {
    let resultado;

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/verificar-correo-recinto/${correo}`,
        responseType: 'json'
    })
    .then( async function(res){
        console.log(res.data);
        resultado = await res.data.resultado;
    })
    .catch(function(error){
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
            url: 'http://localhost:3000/api/registrar-recinto',
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
            url: 'http://localhost:3000/api/listar-recintos',
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

let buscarRecinto = async (idRecinto) => {
    let recinto;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/buscar-recinto-id',
        responseType: 'json',
        data: {
            _id: idRecinto
        }
    })
    .then( async function(res){
        //console.log(res.data);
        recinto = await res.data;
    })
    .catch(function(error){
        console.log(error);
    });

    return recinto;
}

let modificarRecinto = async (idRecinto, imagenCloudinary, encargado, recinto, capacidad, capacidadEspeciales, provincia, direccion) => {
    let resultado;

    let parametro = {
        '_id': idRecinto,
        'imagen': imagenCloudinary,
        'correoEncargado': encargado,
        'nombreRecinto': recinto,
        'capacidad': capacidad,
        'capacidadDiscapacitados': capacidadEspeciales,
        'provincia': provincia,
        'direccion': direccion
    }

    console.log(parametro);

    for(let i in parametro){
        if(parametro[i] === '') {
            delete parametro[`${i}`];
        }
    }

    console.log(parametro);


    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/modificar-recinto',
        responseType: 'json',
        data: {
            parametro    
        }
    })
    .then(async function(res){
        resultado = await res.data;
        console.log(res.data);
    })
    .catch(function(err){
        console.log(err);
    })

    return resultado;
}