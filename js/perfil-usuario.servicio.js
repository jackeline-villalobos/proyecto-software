'use strict'

const correo = sessionStorage.getItem('correoUsuario');
const grado = sessionStorage.getItem("grado");

let obtener_datos = async() => {

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
        .then(async function(res) {
            usuario = await res.data.usuario;
        })
        .catch(function(error) {
            console.log(error);
        })

    return usuario;


}





































/*
function obtener_datos(id){
    let usuario = '';
    let peticion = $.ajax({
        //url de listar usuario
        url: 'supongamos que tengo el url de listar usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: id
        }
    });

    peticion.done(function(response){
        usuario = response;
    });
    
    return usuario; 
}
*/