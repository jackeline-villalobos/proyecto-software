'use strict';

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaImpuestos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaImpuestos = await listarImpuestos();

    tableBody.innerHTML = '';
    for(let i = 0; i<listaImpuestos.length; i++){
        let nombre = listaImpuestos[i]['nombre'];
        let porcentaje = listaImpuestos[i]['porcentaje'];

        if (nombre.includes(filtro) || porcentaje.includes(filtro)) {
            let fila = tableBody.insertRow();

            fila.insertCell().innerHTML = listaImpuestos[i]['nombre'];
            fila.insertCell().innerHTML = listaImpuestos[i]['porcentaje'];
        }
    };
}

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);