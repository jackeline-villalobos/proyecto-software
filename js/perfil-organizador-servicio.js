'use strict';

const idUsuario = sessionStorage.getItem('idUsuario');
const correoUsuario = sessionStorage.getItem('correoUsuario');

let obtenerDatos = async () =>{
    let organizadorSolicitante;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/buscar-usuario',
        data: {
            _id: _id,
            correo: correo
        }
    })
    .then(async function(res){
        organizadorSolicitante = await res.data.organizadorSolicitante;
    })
    .catch(function(error){
        console.log(error);
    })
    return organizadorSolicitante;
};
