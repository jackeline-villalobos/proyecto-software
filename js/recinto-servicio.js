"use strict";

let registrar_recinto = async(nombreRecinto, capacidad, capacidadDiscapacitados, correoEncargado, direccion, provincia, canton, distrito, imagen, latitud, longitud) => {
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
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });

};

let listarRecintos = async() => {
    let listaRecintos;

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-recintos',
            responseType: 'json'
        })
        .then(function(res) {
            listaRecintos = res.data.recintosBD;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaRecintos;
}