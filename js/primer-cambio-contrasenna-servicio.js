'use strict';

let cambiar_contrasenna = async (codigo, nuevaContrasenna) => {
    let resultado;

    await axios({
        mathod: 'post',
        url: 'http://localhost:3000/api/primer-cambio-contrasenna',
        responseType: 'json',
        data: {
            codigo: codigo,
            nuevaContrasenna: nuevaContrasenna,
            verificarContrasenna: verificarContrasenna
        }
    })

    .then(async function (res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error){
            console.log(error)
        });

    return resultado;

}