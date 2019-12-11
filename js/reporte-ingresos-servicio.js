'use strict';


let listarEventos = async() => {
    let listaEventos;

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-eventos',
            responseType: 'json'
        })
        .then(function(res) {
            console.log(res.data);
            listaEventos = res.data.eventos;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaEventos;
}