'use strict';

let registrarEncargado = async(correoElectronico, telefono, nombreCompleto, fechaDeNacimiento, genero) => {
    let resultado;
    await axios (
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-encargado',
            responseType: 'json',
            //body
            data: {
                correoElectronico: correoElectronico,
                telefono: telefono,
                nombreCompleto: nombreCompleto,
                fechaDeNacimiento: fechaDeNacimiento,
                contrasenna: pcontrasenna,
                genero: genero
            }
        }

    )
    .then(async function(res){
        console.log(res.data);
        resultado = await res.data;
    })
    .catch(function(error){
        console.log(error);
    });
    
    return resultado;
};

function generarContrasena(){
    let mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let caracterEspecial = ['!', '@', '#', '$', '%', '=', '&', '*', '?', '_'];
    // 1 mayúscula
    let contrasena = mayusculas[Math.floor(Math.random() * mayusculas.length)] + 
    // 5 minúsculas
    minusculas[Math.floor(Math.random() * minusculas.length)] + 
    minusculas[Math.floor(Math.random() * minusculas.length)] + 
    minusculas[Math.floor(Math.random() * minusculas.length)] +
    // 1 número
    [Math.floor((Math.random() * 33) + 1)] + 
    // 1 caracter especial
    caracterEspecial[Math.floor(Math.random() * caracterEspecial.length)];

    return contrasena;
};

let listarEncargados = async() => {

    let listaEncargados;
    await axios({
        method : 'get',
        url : 'http://localhost:3000/api/listar-encargados',
        responseType: 'json'
    })
    .then(function(res) {
        console.log(res.data);
        listaEncargados = res.data.encargados;
    })
    .catch(function(error){
        console.log(error);
    });

    return listaEncargados;
}