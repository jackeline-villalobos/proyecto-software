'use strict';

let registrarEncargado = async(correoElectronico, telefono, nombreCompleto, fechaDeNacimiento, genero) => {
    let resultado;
    await axios (
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-encargado',
            responseType: 'json',
            //body
            data: {
                correoElectronico: correoElectronico,
                telefono: telefono,
                nombreCompleto: nombreCompleto,
                fechaDeNacimiento: fechaDeNacimiento,
                genero: genero
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
