'use strict';

let iniciarSesion = async (correo, contrasenna) => {
    let resultado;
    await axios ({
        method: 'post',
        url: 'http://localhost:3000/api/iniciar-sesion',
        responseType: 'json',
        data: {
            correo: correo,
            contrasenna: contrasenna
        }
    })
    .then(async function(res){
        resultado = await res.data;
        console.log(res.data);

        if(res.data.resultado) {
            sessionStorage.setItem('conectado', res.data.resultado);
            sessionStorage.setItem('IdUsuario', res.data.usuario._id);
            //sessionStorage.setItem('gradoUsuario', res.data.usuario.grado);
        }
        
    })
    .catch(function(error){
        console.log(error);
    });

    return resultado;
}