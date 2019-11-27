'use strict';

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaImpuestos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaImpuestos = await listarDescuentos();
    console.log(listaImpuestos);

    tableBody.innerHTML = '';
    for(let i = 0; i < listaImpuestos.impuestos.length; i++){
        let nombre = listaImpuestos.impuestos[i]['nombreImpuesto'].toLowerCase();

        if(nombre.includes(filtro)) {
            let fila = tableBody.insertRow();
            fila.insertCell().innerHTML = listaImpuestos.impuestos[i]['nombreImpuesto'];
        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);