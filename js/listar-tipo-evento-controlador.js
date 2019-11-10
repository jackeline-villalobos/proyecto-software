'use strict';

const tableBody = document.querySelector('#tbl-tipoEventos tbody');
let listatipoEventos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listatipoEventos = await listartipoEventos();

    tableBody.innerHTML = '';

    for (let i = 0; i < listatipoEventos.length; i++) {
        let nombre = listatipoEventos[i]['nombre'].toLowerCase();

        /*
        if (nombre.includes(filtro)) {
            let fila = tableBody.insertRow();
            let porcentaje = (listaImpuestos[i]['porcentaje']) * 100;
            fila.insertCell().innerHTML = listaImpuestos[i]['nombre'];
            fila.insertCell().innerHTML = porcentaje + '%';
        }
        */
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);