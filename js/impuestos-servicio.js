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