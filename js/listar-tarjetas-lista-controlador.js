'use strict';

const inputFiltro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-tarjetas tbody');
const correoUsuarioP = sessionStorage.getItem('correoUsuarioPerfil');

let llenarTabla = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaUsuarios = await listarTarjetas();

    tableBody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {

        if(correoUsuarioP == listaUsuarios[i]['correo']) {

           for(let y = 0; y < listaUsuarios[i].tarjeta.length; y++) {

            //console.log(listaUsuarios[i].tarjeta[y]);
            let marca = listaUsuarios[i]['tarjeta'][y]['marca'].toLowerCase();

            if(marca.includes(filtro)) {

                let fila = tableBody.insertRow();
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][y]['numero'];
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][y]['fechaExpiracion'];
                fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][y]['marca'];
                
            }
           }

        }  else {

            //console.log('No tienes tarjetas asociadas');

        }

    }

}

llenarTabla();

inputFiltro.addEventListener('keyup', llenarTabla);