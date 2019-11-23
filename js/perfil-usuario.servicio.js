'use strict'

const correo = sessionStorage.getItem('correoUsuario');
const grado = sessionStorage.getItem("grado");

let obtener_datos = async() => {
    await axios({

            method: "post",
            url: "",
            responseType: "JSON",
            data: {
                _id: _id,
                correo: correo
            }
        })
        .then(async function(res) {
            console.log(res);
        })
        .catch(function(error) {
            console.log(error);
        })


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