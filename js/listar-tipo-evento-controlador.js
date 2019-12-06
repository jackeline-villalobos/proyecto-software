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
        if (nombre.includes(filtro)) {
            let btnEditar = document.createElement('button');
            btnEditar.innerHTML = ('Editar')
            btnEditar.classList.add('btn-mas');



            let fila = tableBody.insertRow();
            fila.insertCell().innerHTML = listatipoEventos[i]['nombre'];
            fila.insertCell().innerHTML = estado;
            fila.insertCell().appendChild(btnEditar).innerHTML;
            let tipoEvento = listatipoEventos[i]['nombre'];

            btnEditar.dataset._id = listatipoEventos[i]['_id'];

            let idtipoEvento = listatipoEventos[i]['_id'];
            console.log(idtipoEvento);

            btnEditar.addEventListener('click', function() {
                sessionStorage.setItem('tipoEvento', idtipoEvento);
                sessionStorage.setItem('nombretipoEvento', tipoEvento);

                window.location.href = 'modificar-tipoEvento.html';
            });


        }
    };
};

llenarTabla();
inputFiltro.addEventListener('keyup', llenarTabla);