'use strict';

let registrarEncargado = async(correoElectronico, telefono, nombreCompleto, fechaDeNacimiento, genero, contrasenna) => {
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
                genero: genero,
                contrasenna: contrasenna
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


let listarEncargados = async() => {

    let listaEncargados;
    await axios({
        method : 'get',
        url : 'http://localhost:3000/api/listar-encargados',
        responseType: 'json'
    })
    .then(function(res) {
        console.log(res.data);
        listaEncargados = res.data.encargados;
    })
    .catch(function(error){
        console.log(error);
    });

    return listaEncargados;
}

let agregarRecinto = async (nombreRecinto) => {
    let _id = sessionStorage.getItem('idRecinto') ; 
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/agregar-recinto',
            responseType: 'json',
            data: {
                nombreRecinto: nombreRecinto
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
             console.log(error);

        });
};