'use strict';

let registrarDescuento = async(nombre, porcentaje) => {
    let resultado;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-descuento',
            responseType: 'json',
            data: {
                nombre: nombre,
                porcentaje: porcentaje
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



let listarDescuentos = async() => {
    let idEvento = localStorage.getItem('idEvento');
    let listaDescuentos;
    await axios({
            method: 'post',
            url: 'https://proyecto-software-prod.herokuapp.com/api/buscar-evento-id',
            responseType: 'json',
            data: {
                _id: idEvento
            }
        })
        .then(async function(res) {
            console.log(res.data.evento);
            listaDescuentos = res.data.evento;
        })
        .catch(function(error) {
            console.log(error);
        })

    return listaDescuentos;
}