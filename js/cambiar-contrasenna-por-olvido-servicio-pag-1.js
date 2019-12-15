'use strict';

let enviarCodigoSeguridad = async(direccionCorreo) => {
    let resultado;
    let codigoSeguridad = generarCodigoSeguridad();

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/iniciar-sesion',
            responseType: 'json',
            data: {
                direccionCorreo: direccionCorreo,
                codigoSeguridad: codigoSeguridad,


            }
        })
        .then(async function(res) {
            resultado = await res.data;
            console.log(res.data);

            if (res.data.resultado) {
                sessionStorage.setItem('conectado', res.data.resultado);
                sessionStorage.setItem('IdUsuario', res.data.usuario._id);
                //sessionStorage.setItem('gradoUsuario', res.data.usuario.grado);
            }

        })
        .catch(function(error) {
            console.log(error);
        });

    return resultado;
}


let generarCodigoSeguridad = () => {
    let mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let caracterEspecial = ['!', '@', '#', '$', '%', '=', '&', '*', '?', '_'];
    // 1 mayúscula
    let codigoSeguridad = mayusculas[Math.floor(Math.random() * mayusculas.length)] +
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

    return codigoSeguridad;
};