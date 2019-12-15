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


let registrar_usuario = async(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, genero, provincia, canton, distrito, direccion, imagen) => {
    let resultado;
    let pcontrasenna = generarContrasena();

    await axios({
        method: 'post',
        url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-usuario',
        responseType: 'json',
        data: {
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            correo: correo,
            fechaDeNacimiento: fechaDeNacimiento,
            genero: genero,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion: direccion,
            contrasenna: pcontrasenna,
            imagen: imagen
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



function generarContrasena() {
    let mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let caracterEspecial = ['!', '@', '#', '$', '%', '=', '&', '*', '?', '_'];
    // 1 mayúscula
    let contrasena = mayusculas[Math.floor(Math.random() * mayusculas.length)] +
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

    return contrasena;
};


let listarUsuarios = async() => {

    let listaUsuarios;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-usuarios',
            responseType: 'json'
        })
        .then(function(res) {
            //console.log(res.data);
            listaUsuarios = res.data;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaUsuarios;
}