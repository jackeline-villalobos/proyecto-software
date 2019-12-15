'use strict';

let registrartipoEvento = async(nombre) => {
    let resultado;
    await axios({
                method: 'post',
                url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-tipo-evento',
                responseType: 'json',
                data: {
                    nombre: nombre,
                    estado: "activo"

                }
            }

        )
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });

    return resultado;
};

let listartipoEventos = async() => {

    let listatipoEventos;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-tipo-evento',
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

let modificartipoEvento = async(_id, nombre, estado) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-tipoEvento',
            responseType: 'json',
            data: {
                _id: _id,
                nombre: nombre,
                estado: estado

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


let modificarEstado = async(_id, estado) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/modificar-estado-tipoEvento',
            responseType: 'json',
            data: {
                _id: _id,
                estado: estado
            }
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });


    return resultado;
}

let eliminartipoEvento = async(_id) => {

    let resultado;

    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/eliminar-tipoEvento',
            responseType: 'json',
            data: {
                _id: _id,
            }

        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });


    return resultado;
}