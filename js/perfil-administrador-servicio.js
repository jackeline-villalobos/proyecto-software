'use strict';

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