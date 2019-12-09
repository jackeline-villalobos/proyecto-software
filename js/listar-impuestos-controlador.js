'use strict';

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaImpuestos;
const inputFiltro = document.querySelector('#txt-filtro');

let llenarTabla = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    listaImpuestos = await listarImpuestos();
    console.log(listaImpuestos);

    tableBody.innerHTML = '';
    for (let i = 0; i < listaImpuestos.length; i++) {
        let nombre = listaImpuestos[i]['nombre'].toLowerCase();

        if (nombre.includes(filtro)) {
            let btnEditar = document.createElement('button');
            btnEditar.innerHTML = ('Editar')
            btnEditar.classList.add('btn-mas');


            let fila = tableBody.insertRow();
            let porcentaje = (listaImpuestos[i]['porcentaje']) * 100;
            fila.insertCell().innerHTML = listaImpuestos[i]['nombre'];
            fila.insertCell().innerHTML = porcentaje + '%';
            fila.insertCell().innerHTML = listaImpuestos[i]['estado'];
            fila.insertCell().appendChild(btnEditar).innerHTML;

            let impuesto = listaImpuestos[i]['nombre'];

            btnEditar.dataset._id = listaImpuestos[i]['_id'];

            let idImpuesto = listaImpuestos[i]['_id'];
            console.log(idImpuesto);

            btnEditar.addEventListener('click', function () {
                sessionStorage.setItem('impuesto', idImpuesto);
                sessionStorage.setItem('nombreImpuesto', impuesto);
                sessionStorage.setItem('porcentajeImpuesto', porcentaje);
                window.location.href = 'modificar-impuesto.html';
            });


        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);