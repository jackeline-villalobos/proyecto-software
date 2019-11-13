'use strict';

const tableBody = document.querySelector('#tbl-descuentos tbody');
let listaDescuentos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaDescuentos = await listarDescuentos();

    tableBody.innerHTML = '';
    for(let i = 0; i < listaDescuentos.length; i++){
        let nombre = listaDescuentos[i]['nombre'].toLowerCase();

        if(nombre.includes(filtro)) {
            let fila = tableBody.insertRow();
            let porcentaje = (listaDescuentos[i]['porcentaje'])*100;
            fila.insertCell().innerHTML = listaDescuentos[i]['nombre'];
            fila.insertCell().innerHTML = porcentaje + '%';
        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);