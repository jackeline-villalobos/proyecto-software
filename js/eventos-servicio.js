'use strict';

let registrar_evento = async(nombre, fecha, tipo_de_eventos, lugar, hora, descripcion, imagen) => {
    await axios(
        {
            method : 'post' ,
            url : 'http://localhost:3000/api/registrar-evento',
            responseType : 'json',
            data :{
                nombre : nombre,
                fecha : fecha,
                tipo_de_eventos : tipo_de_eventos,
                lugar : lugar,
                hora : hora,
                descripcion : descripcion,
                imagen : imagen
            }
        })
        .then(function(res){
            console.log(res.data);

        })
        .catch(function(error){
            console.log(error);

        });

};