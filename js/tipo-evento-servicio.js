'use strict';

let registrartipoEvento = async(nombre) => {
    let resultado;
    await axios({
                method: 'post',
                url: 'http://localhost:3000/api/registrar-tipo-evento',
                responseType: 'json',
                data: {
                    nombre: nombre,
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

let modificartipoEvento = async(_id, nombre) => {

    let resultado;
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/modificar-tipoEvento',
            responseType: 'json',
            data: {
                _id: _id,
                nombre: nombre

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


/*
let verificarNombre = async(nombre) => {
    let resultado;

    await axios({
            method: 'get',
            url: `http://localhost:3000/api/listar-tipo-evento/${nombre}`,
            responseType: 'json'
        })
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data.resultado;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}
*/