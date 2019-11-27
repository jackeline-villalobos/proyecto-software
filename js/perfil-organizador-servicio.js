'use strict';

const idUsuario = sessionStorage.getItem('idUsuario');

let obtenerDatos = async () =>{

    let organizadorSolicitante;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/buscar-organizador-id',
        data: {
            _id: idUsuario,
        }
    })
    .then(async function(res){
        organizadorSolicitante = await res.data;
    })
    .catch(function(error){
        console.log(error);
    })
    return organizadorSolicitante;
};

let listarEventos = async () => {
    let listaEventos;
    await axios ({
        method: 'get',
        url: 'http://localhost:3000/api/listar-eventos',
        responseType: 'json'
    })
    .then(function(res){
        listaEventos = res.data.eventos;
    })
    .catch(function(error){
        console.log(error);
    });
    return listaEventos;
};