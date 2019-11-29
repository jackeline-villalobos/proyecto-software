'use strict';

let verificarCorreo = async(correo) => {
    let resultado;

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/buscar-usuario-registro/${correo}`,
        responseType: 'json'
    })
    .then( async function(res){
        console.log(res.data);
        resultado = await res.data.resultado;
    })
    .catch(function(err){
        console.log(err);
    });

    return resultado;
}


let registrar_organizadorSolicitante = async (nombreEmpresa, cedulaJuridica, experiencia, nombreComercial, provincia, canton, distrito, sennas, nombreCompleto, correo, telefono, genero) => {
    
    let resultado;

    let pcontrasenna = generarContrasena();
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-organizadorSolicitante',
            responseType: 'json',
            data: {
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
                contrasenna: pcontrasenna,
                telefono: telefono,
                genero: genero
            }
        }
    )
    .then( async function(res){
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
    minusculas[Math.floor(Math.random() * minusculas.length)] + 
    minusculas[Math.floor(Math.random() * minusculas.length)] +
    // 1 número
    [Math.floor((Math.random() * 33) + 1)] + 
    // 1 caracter especial
    caracterEspecial[Math.floor(Math.random() * caracterEspecial.length)];

    return contrasena;
};

let listar_organizadorSolicitantes = async () => {

    let lista_organizadorSolicitantes;

    await axios({
        method : 'get',
        url: 'http://localhost:3000/api//listar-organizadorSolicitante',
        responseType: 'json'
    })
    .then(function(res){
        console.log(res.data);
        lista_organizadorSolicitantes = res.data.organizadores;
    })
    .catch(function(error){
        console.log(error);
    });
    return lista_organizadorSolicitantes;
};

// let activar_organizador = async () => {
//     await axios(
//         {
//             method: 'post',
//             url: 'http://localhost:3000/api/activar-organizador',
//             responseType: 'json',
//             data: 'activo'
//             })
//         .then(function (res) {
//             console.log(res.data);

//         })
//         .catch(function (error) {
//             console.log(error);

//         });
// };

// let desactivar_organizador = async () => {
//     await axios(
//         {
//             method: 'post',
//             url: 'http://localhost:3000/api/desactivar-organizador',
//             responseType: 'json',
//             data: 'inactivo'
//             })
//         .then(function (res) {
//             console.log(res.data);

//         })
//         .catch(function (error) {
//             console.log(error);

//         });
// };