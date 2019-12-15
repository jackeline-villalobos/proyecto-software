'use strict';

let registrar_evento = async(nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, creador, imagen) => {
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-evento',
            responseType: 'json',
            data: {
                nombre: nombre,
                tipoDeEventos: tipoDeEventos,
                pais: pais,
                lugar: lugar,
                precioEntrada: precioEntrada,
                descripcion: descripcion,
                creador: creador,
                imagen: imagen,

            }
        })
        .then(function(res) {
            console.log(res.data);
            localStorage.setItem('idEvento', res.data.evento._id);

        })
        .catch(function(error) {
            console.log(error);

        });

};

let editarEvento = async(_id, nombre, tipoDeEventos, pais, lugar, descripcion, precioEntrada, creador, imagen) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/editar-evento',
            responseType: 'json',
            data: {
                _id: _id,
                nombre: nombre,
                tipoDeEventos: tipoDeEventos,
                pais: pais,
                lugar: lugar,
                precioEntrada: precioEntrada,
                descripcion: descripcion,
                creador: creador,
                imagen: imagen,
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(err)
        });

    return resultado;

}

let agregar_fecha = async(fecha, hora, cantidadAsistentes) => {
    let _id = localStorage.getItem('idEvento');
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-fecha',
            responseType: 'json',
            data: {
                fecha: fecha,
                hora: hora,
                cantidadAsistentes: cantidadAsistentes,
                _id: _id
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });
};

let agregar_descuento = async(nombreDescuento, porcentajeDescuento) => {
    let _id = localStorage.getItem('idEvento');
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-descuento',
            responseType: 'json',
            data: {
                nombreDescuento: nombreDescuento,
                porcentajeDescuento: porcentajeDescuento,
                _id: _id
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });
};

let agregar_impuesto = async(nombreImpuesto) => {
    let _id = localStorage.getItem('idEvento');
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-impuesto',
            responseType: 'json',
            data: {
                nombreImpuesto: nombreImpuesto,
                _id: _id
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });
};

let agregar_comentario = async(fotoUsuario, nombreUsuario, comentario) => {
    let _id = localStorage.getItem('idEvento');
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-comentario',
            responseType: 'json',
            data: {
                fotoUsuario: fotoUsuario,
                nombreUsuario: nombreUsuario,
                comentario: comentario,
                _id: _id
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });
};

let agregar_calificacion = async(idUsuario, calificacion) => {
    let _id = localStorage.getItem('idEvento');
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-calificacion',
            responseType: 'json',
            data: {
                idUsuario: idUsuario,
                calificacion: calificacion,
                _id: _id
            }
        })
        .then(function(res) {
            console.log(res.data);

        })
        .catch(function(error) {
            console.log(error);

        });
};

let listarEventos = async() => {
    let listaEventos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-eventos',
            responseType: 'json'
        })
        .then(function(res) {
            listaEventos = res.data.eventos;
        })
        .catch(function(error) {
            console.log(error);
        });
    return listaEventos;
};

let listarImpuestos = async() => {

    let listaImpuestos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-impuestos',
            responseType: 'json'
        })
        .then(function(res) {
            listaImpuestos = res.data.impuestos;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaImpuestos;

};

let listartipoEventos = async() => {

    let listatipoEventos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-tipo-evento',
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
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-recintos',
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

let buscarEvento = async(idEvento) => {

    let evento;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-evento-id',
            responseType: 'json',
            data: {
                _id: idEvento
            }
        })
        .then(function(res) {
            evento = res.data;
        })
        .catch(function(error) {
            console.log(error);
        })
    return evento;
};

let obtenerRecinto = async(nombreRecinto) => {
    try {
        const response = await axios({
            method: 'get',
            params: { nombreRecinto: nombreRecinto },
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-recinto-nombre',
            responseType: 'json'
        });
        return response.data.recinto;
    } catch (error) {
        console.log(error);
    }
};

let eventoFinalizado = async(_id) => {
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/marcar-finalizado',
            responseType: 'json',
            data: {
                _id: _id,
            }
        })
        .then(function(res) {
            console.log(res.data);
        })
        .then(function(error) {
            console.log(error);
        });
};

let agregarCarritoCompras = async(idUsuario, idEvento, numeroEntradas, fechaEvento, fechaId) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/agregar-entradas',
            responseType: 'json',
            data: {
                _id: idUsuario,
                idEvento: idEvento,
                numeroEntradas: numeroEntradas,
                fechaEvento: fechaEvento,
                idFecha: fechaId
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}