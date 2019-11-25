'use strict';

let registrar_evento = async(nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, imagen) => {
    await axios({
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
                imagen: imagen,

            }
        })
        .then(function(res) {
            console.log(res.data);
            sessionStorage.setItem('idEvento', res.data.evento._id);

        })
        .catch(function(error) {
            console.log(error);

        });

};



let agregar_fecha = async (fecha, hora, cantidadAsistentes) => {
    let _id = sessionStorage.getItem('idEvento') ; 
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/agregar-fecha',
            responseType: 'json',
            data: {
                    fecha: fecha,
                    hora: hora,
                    cantidadAsistentes: cantidadAsistentes,
                    _id: _id
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });
};

let agregar_descuento = async (nombreDescuento, porcentajeDescuento) => {
    let _id = sessionStorage.getItem('idEvento') ; 
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/agregar-descuento',
            responseType: 'json',
            data: {
                nombreDescuento: nombreDescuento,
                porcentajeDescuento: porcentajeDescuento,
                _id: _id
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
             console.log(error);

        });
};

let agregar_impuesto = async (nombreImpuesto) => {
    let _id = sessionStorage.getItem('idEvento') ; 
    await axios(
        {
            method: 'post',
            url: 'http://localhost:3000/api/agregar-impuesto',
            responseType: 'json',
            data: {
                nombreImpuesto: nombreImpuesto,
                _id: _id
                }
            })
        .then(function (res) {
            console.log(res.data);

        })
        .catch(function (error) {
            console.log(error);

        });
};

let listarEventos = async () => {
    let listaEventos;
    await axios ({
        method: 'get',
        url: 'http://localhost:3000/api/listar-eventos',
        responseType: 'json'
    })
    .then(function(res){
        listaEventos = res.data.eventos;
    })
    .catch(function(error){
        console.log(error);
    });
    return listaEventos;
};

let listarImpuestos = async() => {

    let listaImpuestos;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuestos',
        responseType: 'json'
    })
    .then(function(res) {
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
        .then(async function(res) {
            listatipoEventos = await res.data.tipoEventos;
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

let buscarEvento = async () =>{

    let evento;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/buscar-evento-id',
        responseType: 'json',
        data: {
            _id: idEvento
        }
    })
    .then( async function(res){
        evento = await res.data;
    })
    .catch(function(error){
        console.log(error);
    })
    return evento;
};

let obtenerRecinto = async(nombreRecinto) =>{
    try{
        const response = await axios({
            method : 'get',
            params: {nombreRecinto: nombreRecinto},
            url: 'http://localhost:3000/api/buscar-recinto-nombre',
            responseType: 'json'
        });
        return response.data.recinto;
    }catch(error){
        console.log(error);
    }
};