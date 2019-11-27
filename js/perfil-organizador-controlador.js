'use strict';

const nombreEmpresa_container = document.querySelector('#nombreEmpresa_container');
const cedulaJuridica_container = document.querySelector('#cedulaJuridica_container');
const experiencia_container = document.querySelector('#experiencia_container');
const nombreComercial_container = document.querySelector('#nombreComercial_container');

const provincia_container = document.querySelector('#provincia_container');
const canton_container = document.querySelector('#canton_container');
const distrito_container = document.querySelector('#distrito_container');
const sennas_container = document.querySelector('#sennas_container');

const nombre_container = document.querySelector('#nombre_container');
const correo_container = document.querySelector('#correo_container');
const  telefono_container = document.querySelector('#telefono_container');
const genero_container = document.querySelector('#genero_container');

let mostrarInfo = async () =>{

    let organizador = await obtener_datos();
    console.log(organizador);
};