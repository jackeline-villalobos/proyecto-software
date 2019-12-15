"use strict";

let verificarCorreo = async(correo) => {
    let resultado;

    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/buscar-usuario-registro/${correo}`,
            responseType: 'json'
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data.resultado;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let registrar_empresa = async(nombreEmpresa, razonSocial, cedulaJuridica, telefono, correo, direccion, provincia, canton, distrito, imagen, latitud, longitud, contrasenna) => {
    let error;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-empresa',
            responseType: 'json',
            data: {
                nombreEmpresa: nombreEmpresa,
                razonSocial: razonSocial,
                cedulaJuridica: cedulaJuridica,
                telefono: telefono,
                correo: correo,
                direccion: direccion,
                provincia: provincia,
                canton: canton,
                distrito: distrito,
                imagen: imagen,
                latitud: latitud,
                longitud: longitud,
                contrasenna: contrasenna


            }
        })
        .then(async function(res) {
            console.log(res.data);
            error = await res.data.resultado;

        })
        .catch(function(error) {
            console.log(error);

        });

    return error;

};

const idUsuario = sessionStorage.getItem('idUsuario');
let obtenerDatos = async() => {

    let empresa;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-empresa-id',
            data: {
                _id: idUsuario,
            }
        })
        .then(async function(res) {
            empresa = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        })
    return empresa;
};

let listarEventos = async() => {
    let listaEventos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-eventos',
            responseType: 'json'
        })
        .then(function(res) {
            listaEventos = res.data.eventos;
        })
        .catch(function(error) {
            console.log(error);
        });
    return listaEventos;
};