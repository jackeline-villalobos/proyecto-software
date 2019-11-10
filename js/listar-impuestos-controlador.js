'use strict';

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaImpuestos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaImpuestos = await listarImpuestos();

    tableBody.innerHTML = '';
    for(let i = 0; i<listaImpuestos.length; i++){
        let nombre = listaImpuestos[i]['nombre'].toLowerCase();

        if (nombre.includes(filtro)) {
            let fila = tableBody.insertRow();
            let porcentaje = (listaImpuestos[i]['porcentaje']) * 100;
            fila.insertCell().innerHTML = listaImpuestos[i]['nombre'];
            fila.insertCell().innerHTML = porcentaje + '%';
        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);