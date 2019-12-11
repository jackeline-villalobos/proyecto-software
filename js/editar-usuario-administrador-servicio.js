"use strict";



let buscarUsuario = async(correo) => {

    let resultado;

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/buscar-usuario',
            responseType: 'json',
            data: {
                correo: correo
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
}
let modificarEstado = async(id, estado) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/editar-usuario-administrador',
            responseType: 'json',
            data: {
                _id: id,
                estado: estado
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
}
let modificarBaneo = async(id, baneado) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/editar-usuario-administrador',
            responseType: 'json',
            data: {
                _id: id,
                baneado: baneado
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
}