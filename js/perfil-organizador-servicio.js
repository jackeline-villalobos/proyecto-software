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
