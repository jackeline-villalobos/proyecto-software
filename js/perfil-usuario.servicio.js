'use strict'

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