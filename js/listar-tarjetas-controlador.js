'use strict';

const inputFiltro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-tarjetas tbody');

let llenarTabla = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaUsuarios = await listarTarjetas();

    let idUsuario = sessionStorage.getItem('idUsuario');
    tableBody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {

        if (idUsuario == listaUsuarios[i]['_id']) {

            for (let y = 0; y < listaUsuarios[i].tarjeta.length; y++) {

                console.log(listaUsuarios[i].tarjeta[y]);
                let marca = listaUsuarios[i]['tarjeta'][y]['marca'].toLowerCase();

                if (marca.includes(filtro)) {

                    let fila = tableBody.insertRow();
                    let numTarjeta = ocultarTarjeta(listaUsuarios[i]['tarjeta'][y]['numero']);
                    fila.insertCell().innerHTML = numTarjeta;
                    fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][y]['fechaExpiracion'];
                    fila.insertCell().innerHTML = listaUsuarios[i]['tarjeta'][y]['marca'];

                    // let btnPerfil = document.createElement('button');
                    // btnPerfil.innerHTML = ('Ver más')
                    // btnPerfil.classList.add('btn-mas');
                    // btnPerfil.onclick = function  btnPerfilOnclick(){

                    //     location.href = "editar-tarjetas-usuario.html";
                    // }
                    // fila.insertCell().appendChild(btnPerfil).innerHTML;

                }
            }

        } else {

            console.log('No tienes tarjetas asociadas');

        }

    }

}

llenarTabla();
let ocultarTarjeta = (numTarjeta) => {

    let oculto = numTarjeta.replace(/.(?=.{4,}$)/g, '*');
    return oculto;
}

inputFiltro.addEventListener('keyup', llenarTabla);