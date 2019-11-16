'use strict';

const inputFiltro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-usuarios');

let llenarTabla = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaUsuarios = await listarUsuarios();
    console.log(listaUsuarios);

    tableBody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        let nombre = listaUsuarios[i]['nombre'];
        let primerApellido = listaUsuarios[i]['primerApellido'];
        let segundoApellido = listaUsuarios[i]['segundoApellido'];
        let correo = listaUsuarios[i]['correo'];

        if (nombre.includes(filtro) || primerApellido.includes(filtro) || segundoApellido.includes(segundoApellido) || correo.includes(filtro)) {
            let fila = tableBody.insertRow();
            fila.insertCell().innerHTML = listaUsuarios[i]['nombre'];
            fila.insertCell().innerHTML = listaUsuarios[i]['primerApellido'];
            fila.insertCell().innerHTML = listaUsuarios[i]['segundoApellido'];
            fila.insertCell().innerHTML = listaUsuarios[i]['genero'];
            fila.insertCell().innerHTML = listaUsuarios[i]['correo'];
        };
    };
};

llenarTabla();

inputFiltro.addEventListener('keyup', llenarTabla);