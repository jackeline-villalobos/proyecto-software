'use strict';

const input_filtro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-organizadores tbody');

let listaOrganizadores;

let llenarTabla = async () => {

    let filtro = input_filtro.value.toLowerCase();
    
    listaOrganizadores = await listar_organizadorSolicitantes();
    console.log(listaOrganizadores);

     tableBody.innerHTML = '';

     for(let i = 0; i < listaOrganizadores.length; i++){
         let nombre = listaOrganizadores[i]['nombreCompleto'].toLowerCase();
         let nombreEmpresa = listaOrganizadores[i]['nombreEmpresa'].toLowerCase();

         if(nombre.includes(filtro) || nombreEmpresa.includes(filtro)){
             let fila = tableBody.insertRow();
             let btnActivar = document.createElement('button');
             btnActivar.innerHTML = ('Activar');
             btnActivar.classList.add('btn-activar');

             let btnDesactivar = document.createElement('button');
             btnDesactivar.innerHTML = ('Desactivar');
             btnDesactivar.classList.add('btn-desactivar');

             fila.insertCell().innerHTML = listaOrganizadores[i]['nombreEmpresa'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['cedulaJuridica'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['experiencia'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['nombreComercial'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['provincia'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['canton'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['distrito'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['sennas'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['nombreCompleto'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['correo'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['telefono'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['genero'];
             fila.insertCell().innerHTML = listaOrganizadores[i]['estado'];
             fila.insertCell().appendChild(btnActivar).innerHTML;
             fila.insertCell().appendChild(btnDesactivar).innerHTML;

            //  btnActivar.addEventListener('click', activar_organizador);
            //  btnDesactivar.addEventListener('click', desactivar_organizador);

         }
     };
};

llenarTabla();

input_filtro.addEventListener('keyup', llenarTabla);