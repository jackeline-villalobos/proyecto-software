'use strict';


let buscarUsuarioCorreo = async() => {

    let resultado;

    let userMail = sessionStorage.getItem('correoUsuario');

    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/buscar-usuario-correo/${userMail}`,
            responseType: 'json'
        })
        .then(async function(res) {
            //console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;

}

let eliminarEntrada = async(idUsuario, idEntrada) => {
    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/eliminar-entrada',
            responseType: 'json',
            data: {
                _id: idUsuario,
                idEntrada: idEntrada
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let listarImpuestosCarrito = async() => {

    let resultado;

    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-impuestos',
            responseType: 'json'
        })
        .then(async function(res) {
            //console.log(res.data.impuestos);
            resultado = await res.data.impuestos;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;

}

let comprarEntrada = async(idEvento, idFecha, entradasUsuario) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/comprar-entrada',
            responseType: 'json',
            data: {
                idEvento: idEvento,
                idFecha: idFecha,
                entradasUsuario: entradasUsuario
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let agregarNotificacion = async(idUsuario, fecha, nombreEvento, entradaID) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-notificacion',
            responseType: 'json',
            data: {
                _id: idUsuario,
                titulo: 'Compra de entrada',
                descripcion: 'Usted ha realizado una compra para el evento: ' + nombreEvento,
                fecha: fecha,
                entradaID: entradaID
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}