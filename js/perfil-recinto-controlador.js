'use strict';

let idRecinto = sessionStorage.getItem('idRecinto');
//const mainContainer = document.querySelector('#main-container');
const imagen = document.querySelector('#imagen');
const h2 = document.querySelector('#h2-title');
const h3 = document.querySelector('#h3-title');
const h4 = document.querySelector('#h4-title');
const h5 = document.querySelector('#h5-title');
const h6 = document.querySelector('#h6-title');
const parrafo = document.querySelector('#parrafo');


let llenarPerfil = async() => {
    let recinto = await buscarRecinto(idRecinto);
    console.log(recinto);
    let imagenSource = recinto.recinto.imagen;
    imagen.src = `${imagenSource}`;

    let encargado = recinto.recinto.correoEncargado;
    h2.innerHTML = 'Encargado: ' + encargado;

    let nombreRecinto = recinto.recinto.nombreRecinto;
    h3.innerHTML = 'Nombre de recinto: ' + nombreRecinto;

    let capacidad = recinto.recinto.capacidad;
    h4.innerHTML = 'Capacidad de recinto: ' + capacidad;

    let asientosDiscapacitados = recinto.recinto.capacidadDiscapacitados;
    h5.innerHTML = 'Asientos especiales: ' + asientosDiscapacitados;

    let provincia = recinto.recinto.provincia;
    h6.innerHTML = 'Provincia: ' + provincia;

    let direccion = recinto.recinto.direccion;
    parrafo.innerHTML = 'Dirección de recinto: ' + direccion;

    let latitud = recinto.recinto.latitud;
    console.log(latitud);

    let longitud = recinto.recinto.longitud;
    console.log(longitud);

    initMap(latitud, longitud);

}

llenarPerfil();