'use strict'

const correo = sessionStorage.getItem('correoUsuario');
const grado = sessionStorage.getItem("grado");
const correoUsuario = sessionStorage.getItem('correoUsuarioPerfil');

let obtener_datos = async () => {

    let usuario;

    await axios({

        method: "post",
        url: "http://localhost:3000/api/buscar-usuario",
        responseType: "JSON",
        data: {
            _id: _id,
            correo: correo
        }
    })
        .then(async function (res) {
            usuario = await res.data.usuario;
        })
        .catch(function (error) {
            console.log(error);
        })

    return usuario;


}

let perfilUsuario = async () => {

    let usuario;

    await axios({

        method: "post",
        url: "http://localhost:3000/api/buscar-usuario",
        responseType: "JSON",
        data: {
            correo: correoUsuario
        }
    })
        .then(async function (res) {
            usuario = await res.data.usuario;
        })
        .catch(function (error) {
            console.log(error);
        })

    return usuario;


}

//Editar perfil

let editarInformacionUsuario = async (_id, primerNombre, segundoNombre, primerApellido, segundoApellido, genero, direccion, provincia, canton, distrito) => {

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
        .then(async function (res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function (error) {
            console.log(err)
        });

    return resultado;

}

//Cambiar contraseña


let cambiarContrasenna = async (_id, contrasenna) => {

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
        .then(async function (res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function (error) {
            console.log(err);
        });

    return resultado;

}

//Editar tarjeta

let editarInformacionTarjeta = async (_id, numeroTarjeta, fechaExpiracion, codigoSeguridad, marca) =>{

    let resultado;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/editar-tarjetas-usuario',
        responseType: 'json',
        data:{
            _id: _id,
            numeroTarjeta: numeroTarjeta,
            fechaExpiracion: fechaExpiracion,
            codigoSeguridad: codigoSeguridad,
            marca: marca
        }
    })
        .then(async function(res){
            console.log(res.data);
            resultado = await res.data;
        }) 
        .catch(function (eror){
            console.log(err)
        });

    return resultado;

}

//Activar y desactivar tarjeta

let editarEstadoTarjeta = async (_id, estado) => {

    let resultado;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/editar-tarjetas-usuario',
        responseType: 'json',
        data:{
            _id: _id,
            estado: estado
        }
    })
    .then(async function(res){
        console.log(res.data);
        resultado = await res.data;
    })
    .catch(function(err){
        console.log(err);
    });

    return resultado;
}























