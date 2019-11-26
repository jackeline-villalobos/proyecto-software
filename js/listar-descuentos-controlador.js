'use strict';

const tableBody = document.querySelector('#tbl-descuentos tbody');
let listaDescuentos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaDescuentos = await listarDescuentos();
    console.log(listaDescuentos);

    tableBody.innerHTML = '';
    for(let i = 0; i < listaDescuentos.descuentos.length; i++){
        let nombre = listaDescuentos.descuentos[i]['nombreDescuento'].toLowerCase();

        if(nombre.includes(filtro)) {
            let fila = tableBody.insertRow();
            fila.insertCell().innerHTML = listaDescuentos.descuentos[i]['nombreDescuento'];
            fila.insertCell().innerHTML = listaDescuentos.descuentos[i]['porcentajeDescuento'] + '%';
        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);