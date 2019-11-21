'use strict';

const inputFiltro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-tarjetas tbody');

let llenarTabla = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaUsuarios = await listarTarjetas();

    let idUsuario = sessionStorage.getItem('idUsuario');
    tableBody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {

        if(idUsuario == listaUsuarios[i]['_id']) {
            let marca = listaUsuarios[i]['tarjeta'][i]['marca'].toLowerCase();
            if(marca.includes(filtro)) {
                let fila = tableBody.insertRow();
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][i]['numero'];
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][i]['fechaExpiracion'];
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][i]['marca'];
            }
        } else {
            console.log('No tienes tarjetas asociadas');
        }
    }
}

llenarTabla();

inputFiltro.addEventListener('keyup', llenarTabla);