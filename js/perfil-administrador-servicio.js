'use strict';

//const correo = sessionStorage.getItem('correoUsuario');
const grado = sessionStorage.getItem("gradoUsuario");
const correoUsuario = sessionStorage.getItem('correoUsuario');


let obtenerDatos = async() => {

    let usuario;

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/buscar-usuario',
            responseType: 'json',
            data: {
                correo: correoUsuario
            }
        })
        .then(async function(res) {
            usuario = await res.data.usuario;
        })
        .catch(function(err) {
            console.log(err);
        })

    return usuario;

}




/****** */


let perfilUsuario = async() => {

    let usuario;

    await axios({

            method: "post",
            url: "http://localhost:3000/api/buscar-usuario",
            responseType: "JSON",
            data: {
                correo: correoUsuario
            }
        })
        .then(async function(res) {
            usuario = await res.data.usuario;
        })
        .catch(function(error) {
            console.log(error);
        })

    return usuario;


}

//Editar perfil

let editarInformacionUsuario = async(_id, primerNombre, segundoNombre, primerApellido, segundoApellido, genero, direccion, provincia, canton, distrito) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/editar-perfil-usuario',
            responseType: 'json',
            data: {
                _id: _id,
                primerNombre: primerNombre,
                segundoNombre: segundoNombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                genero: genero,
                direccion: direccion,
                provincia: provincia,
                canton: canton,
                distrito: distrito
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

//Cambiar contraseña


let cambiarContrasenna = async(_id, contrasenna) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/primer-cambio-contrasenna',
            responseType: 'json',
            data: {
                _id: _id,
                contrasenna: contrasenna
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(err);
        });

    return resultado;

}