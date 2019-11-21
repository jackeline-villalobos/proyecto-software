'use strict';

let registrar_organizadorSolicitante = async (nombreEmpresa, cedulaJuridica, experiencia,
    nombreComercial, provincia, canton, distrito, sennas, nombreCompleto,
    correo, telefono, genero) => {

    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-organizadorSolicitante',
            responseType: 'json',
            data: {
                nombreEmpresa: nombreEmpresa,
                cedulaJuridica: cedulaJuridica,
                experiencia: experiencia,
                nombreComercial: nombreComercial,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
                sennas: sennas,
                nombreCompleto: nombreCompleto,
                correo: correo,
                telefono: telefono,
                genero: genero
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

let listar_organizadorSolicitantes = async () => {

    let lista_organizadorSolicitantes;

    await axios({
        method : 'get',
        url: 'http://localhost:3000/api//listar-organizadorSolicitante',
        responseType: 'json'
    })
    .then(function(res){
        console.log(res.data);
        lista_organizadorSolicitantes = res.data.organizadores;
    })
    .catch(function(error){
        console.log(error);
    });
    return lista_organizadorSolicitantes;
};

let activar_organizador = async () => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/activar-organizador',
            responseType: 'json',
            data: {
                estado :'activo'
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });
};

let desactivar_organizador = async () => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/desactivar-organizador',
            responseType: 'json',
            data: {
                estado :'inactivo'
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });
};