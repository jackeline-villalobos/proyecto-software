"use strict";

let registrar_recinto = async(nombreRecinto, capacidad, capacidadDiscapacitados, direccion, provincia, canton, distrito) => {
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrar-recinto',
            responseType: 'json',
            data: {
                nombreRecinto: nombreRecinto,
                capacidad: capacidad,
                capacidadDiscapacitados: capacidadDiscapacitados,
                direccion: direccion,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });

};