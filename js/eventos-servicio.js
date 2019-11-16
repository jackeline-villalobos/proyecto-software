'use strict';

let registrar_evento = async (nombre, tipoDeEventos, pais, lugar, cantidadAsistentes, precioEntrada, descripcion, impuestos, imagen) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/registrar-evento',
            responseType: 'json',
            data: {
                nombre: nombre,
                tipoDeEventos: tipoDeEventos,
                pais: pais,
                lugar: lugar,
                cantidadAsistentes: cantidadAsistentes,
                precioEntrada: precioEntrada,
                descripcion: descripcion,
                impuestos: impuestos,
                imagen: imagen,

            }
        })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });

};
let agregar_fecha = async (fecha, hora) => {
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/agregar-fecha',
            responseType: 'json',
            data: {
                    fecha: fecha,
                    hora: hora,
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });
};