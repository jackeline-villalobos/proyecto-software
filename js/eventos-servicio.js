'use strict';

let registrar_evento = async(nombre, tipoDeEventos, pais, lugar, cantidadAsistentes, fecha, hora, precioEntrada, descripcion, impuestos, imagen) => {
    await axios(
        {
            method : 'post' ,
            url : 'http://localhost:3000/api/registrar-evento',
            responseType : 'json',
            data :{
                nombre : nombre,
                tipoDeEventos : tipoDeEventos,
                pais: pais,
                lugar : lugar,
                cantidadAsistentes: cantidadAsistentes,
                fecha : fecha,
                hora : hora,
                precioEntrada : precioEntrada,
                descripcion : descripcion,
                impuestos: impuestos,
                imagen : imagen,
                
            }
        })
        .then(function(res){
            console.log(res.data);

        })
        .catch(function(error){
            console.log(error);

        });

};