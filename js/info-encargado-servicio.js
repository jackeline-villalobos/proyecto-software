'use strict';

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


let registrar_encargado = async(correo, telefono, nombreCompleto, fechaNacimiento, genero) => {

    let resultado;

    let pcontrasenna = generarContrasenna();
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-organizadorSolicitante',
            responseType: 'json',
            data: {

                correo: correo,
                contrasenna: pcontrasenna,
                telefono: telefono,
                nombreCompleto: nombreCompleto,
                fechaNacimiento: fechaNacimiento,
                genero: genero
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

};

function generarContrasenna() {
    let mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let caracterEspecial = ['!', '@', '#', '$', '%', '=', '&', '*', '?', '_'];
    // 1 mayúscula
    let contrasenna = mayusculas[Math.floor(Math.random() * mayusculas.length)] +
        // 5 minúsculas
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        minusculas[Math.floor(Math.random() * minusculas.length)] +
        // 1 número
        [Math.floor((Math.random() * 33) + 1)] +
        // 1 caracter especial
        caracterEspecial[Math.floor(Math.random() * caracterEspecial.length)];

    return contrasenna;
};

let listar_encargados = async() => {

    let lista_encargados;

    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api//listar-encargado',
            responseType: 'json'
        })
        .then(function(res) {
            console.log(res.data);
            lista_encargados = res.data.encargados;
        })
        .catch(function(error) {
            console.log(error);
        });
    return lista_encargados;
};

const idUsuario = sessionStorage.getItem('idUsuario');
let obtenerDatos = async() => {

    let encargado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-encargado-id',
            data: {
                _id: idUsuario,
            }
        })
        .then(async function(res) {
            encargado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        })
    return encargado;
};

let listarRecintos = async() => {
    let listaRecintos;
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
    return listaRecintos;
};

let editarEncargado = async(_id, nombreEmpresa, cedulaJuridica, experiencia, nombreComercial, provincia, canton, distrito, sennas, nombreCompleto, correo, telefono, genero) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/editar-perfil-encargado',
            responseType: 'json',
            data: {
                _id: _id,
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
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(err)
        });

    return resultado;

}

let modificarEstado = async(_id, estado) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-estado-encargado',
            responseType: 'json',
            data: {
                _id: _id,
                estado: estado
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data
        })
        .catch(function(error) {
            console.log(error);
        });


    return resultado;
}

let enviarCorreoConfirmacion = async(_id) => {
    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/enviar-correo-confirmacion',
            responseType: 'json',
            data: {
                _id: _id,
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error)
        });

    return resultado;
};

let enviarCorreoRechazo = async(_id) => {
    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/enviar-correo-rechazo',
            responseType: 'json',
            data: {
                _id: _id,
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error)
        });

    return resultado;
};