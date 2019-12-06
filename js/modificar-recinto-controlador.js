'use strict';

let idRecinto = sessionStorage.getItem('idRecinto');
//const mainContainer = document.querySelector('#main-container');
const imagen = document.querySelector('#imagePreview');
const inputEncargado = document.querySelector('#txt-encargado');
const inputRecinto = document.querySelector('#txt-nombreRecinto');
const inputCapacidad = document.querySelector('#txt-capacidad');
const inputCapacidadEspeciales = document.querySelector('#txt-capacidadEspeciales');
const inputProvincia = document.querySelector('#txt-provincia');
const inputDireccion = document.querySelector('#txt-direccion');
const btnModificar = document.querySelector('#btn-modificar');


let llenarPerfil = async() => {
    let recinto = await buscarRecinto(idRecinto);
    console.log(recinto);
    let imagenSource = recinto.recinto.imagen;
    imagen.src = `${imagenSource}`;
    console.log(imagen.src);

    let encargado = recinto.recinto.correoEncargado;
    inputEncargado.setAttribute('placeholder', `${encargado}`);

    let nombreRecinto = recinto.recinto.nombreRecinto;
    inputRecinto.setAttribute('placeholder', `${nombreRecinto}`);

    let capacidad = recinto.recinto.capacidad;
    inputCapacidad.setAttribute('placeholder', `${capacidad}`);

    let asientosDiscapacitados = recinto.recinto.capacidadDiscapacitados;
    inputCapacidadEspeciales.setAttribute('placeholder', `${asientosDiscapacitados}`);

    let provincia = recinto.recinto.provincia;
    inputProvincia.setAttribute('placeholder', `${provincia}`);

    let direccion = recinto.recinto.direccion;
    inputDireccion.setAttribute('placeholder', `${provincia}`);

    let latitud = recinto.recinto.latitud;
    console.log(latitud);

    let longitud = recinto.recinto.longitud;
    console.log(longitud);

    initMap(latitud, longitud);

}

llenarPerfil();

btnModificar.addEventListener('click', function(){
    let imagenCloudinary = imagen.src;
    console.log(imagenCloudinary);
});