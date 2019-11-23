'use strict';

let registrar_evento = async (nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, imagen) => {
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
                precioEntrada: precioEntrada,
                descripcion: descripcion,
                // fechas: [
                //     {
                //         fecha: fecha,
                //         hora: hora,
                //         cantidadAsistentes: cantidadAsistentes,
                //     }
                // ],
                // impuestos: [
                //     {
                //         nombre: nombre,
                //     }
                // ],
                // descuentos: [
                //     {
                //         nombre: nombre,
                //     }
                // ],
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
// let agregar_fecha = async (fecha, hora, cantidadAsistentes) => {
//     await axios(
//         {
//             method: 'post',
//             url: 'http://localhost:3000/api/agregar-fecha',
//             responseType: 'json',
//             data: {
//                     fecha: fecha,
//                     hora: hora,
//                     cantidadAsistentes: cantidadAsistentes,
//                 }
//             })
//         .then(function (res) {
//             console.log(res.data);

//         })
//         .catch(function (error) {
//             console.log(error);

//         });
// };

// let listarEventos = async () => {
//     let listaEventos;
//     await axios ({
//         method: 'get',
//         url: 'http://localhost:3000/api/listar-eventos',
//         responseType: 'json'
//     })
//     .then(function(res){
//         console.log(res.data);
//         listaEventos = res.data.eventos;
//     })
//     .catch(function(error){
//         console.log(error);
//     });
//     return listaEventos;
// };

let listarImpuestos = async() => {

    let listaImpuestos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuestos',
        responseType: 'json'
    })
    .then(function(res) {
        console.log(res.data);
        listaImpuestos = res.data.impuestos;
    })
    .catch(function(error){
        console.log(error);
    });

    return listaImpuestos;

};

let listartipoEventos = async() => {

    let listatipoEventos;
    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-tipo-evento',
            responseType: 'json'
        })
        .then(function(res) {
            listatipoEventos = res.data.tipoEventos;
        })
        .catch(function(error) {
            console.log(error);
        })

    return listatipoEventos;

};

let listarRecintos = async() => {
    let listaRecintos;

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-recintos',
            responseType: 'json'
        })
        .then(function(res) {
            listaRecintos = res.data.recintos;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaRecintos;
};