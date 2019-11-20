'use strict';

let idRecinto = sessionStorage.getItem('idRecinto');
const mainContainer = document.querySelector('#main-container');
const container1 = document.querySelector('#container-1');
const container1divChild = document.querySelector('#container-1 div');
const container2 = document.querySelector('#container-2');


let llenarPerfil = async() => {
    let recinto = await buscarRecinto(idRecinto);
    console.log(recinto);
    let imagenSource = recinto.recinto.imagen;
    let imagen = document.createElement('img');
    imagen.src = `${imagenSource}`;

    let encargado = document.createElement('h2');
    encargado.innerHTML = 'Encargado: ' + recinto.recinto.correoEncargado;

    let nombreRecinto = document.createElement('h3');
    nombreRecinto.innerHTML = 'Nombre de recinto: ' + recinto.recinto.nombreRecinto;

    let capacidad = document.createElement('h4');
    capacidad.innerHTML = 'Capacidad de recinto: ' + recinto.recinto.capacidad;

    let asientosDiscapacitados = document.createElement('h5');
    asientosDiscapacitados.innerHTML = 'Asientos para discapacitados: ' + recinto.recinto.capacidadDiscapacitados;

    let provincia = document.createElement('h6');
    provincia.innerHTML = 'Provincia: ' + recinto.recinto.provincia;

    let direccion = document.createElement('p');
    direccion.innerHTML = 'Dirección de recinto: ' + recinto.recinto.direccion;


    let geolocalizacion = document.createElement('script');
    geolocalizacion.setAttribute('src', 'js/geolocalizacion-card.js');


    let containerMap = document.createElement('div');
    containerMap.setAttribute('id', 'map');
    containerMap.appendChild(geolocalizacion);


    container1divChild.appendChild(imagen);
    container2.appendChild(encargado);
    container2.appendChild(nombreRecinto);
    container2.appendChild(capacidad);
    container2.appendChild(asientosDiscapacitados);
    container2.appendChild(provincia);
    container2.appendChild(direccion);
    //container2.appendChild(geolocalizacion);
    container2.appendChild(containerMap);

    container2.appendChild(latitud);
    container2.appendChild(longitud);

}

llenarPerfil();

initMap(latitud, longitud);