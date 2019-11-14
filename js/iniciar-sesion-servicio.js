'use strict';

/*
let validarCredenciales = (correo, contrasenna) => {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/validarCredenciales',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            correo: correo,
            contrasenna: contrasenna
        }
    });

    peticion.done(function(response){
        respuesta = response;
        sessionStorage.setItem('conectado', response.success);
        sessionStorage.setItem('tipoUsuario', response.usuario.tipo);
    });

    peticion.fail(function(response){
        respuesta = response;
    });

    return respuesta;
};
*/

/*
let validarCredenciales = async(correo, contrasenna) => {
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/validarCredenciales',
            responseType: 'json',
            //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: {
                correo: correo,
                contrasenna: contrasenna


            }
        })
        .then(function(res) {
            console.log(res.data);

            respuesta = response;
            sessionStorage.setItem('conectado', response.success);
            sessionStorage.setItem('tipoUsuario', response.usuario.tipo);

        })
        .catch(function(error) {
            console.log(error);

            respuesta = res;


        });

        return res;


};

*/

let validarCredenciales = async(correo, contrasenna) => {
    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-usuarios',
            responseType: 'json',
            //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            // data: {
            //     correo: correo,
            //     contrasenna: contrasenna


            // }
        })
        .then(function(res) {
            console.log(res.data);
            listaUsuarios = res.data;

            respuesta = response;
            sessionStorage.setItem('conectado', response.success);
            sessionStorage.setItem('tipoUsuario', response.usuario.tipo);

        })
        .catch(function(error) {
            console.log(error);

            //respuesta = res;


        });

        return listaUsuarios;


};

