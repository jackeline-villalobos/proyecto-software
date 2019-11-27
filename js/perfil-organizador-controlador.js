'use strict';

const nombreEmpresa_container = document.querySelector('#nombreEmpresa_container');
const cedulaJuridica_container = document.querySelector('#cedulaJuridica_container');
const experiencia_container = document.querySelector('#experiencia_container');
const nombreComercial_container = document.querySelector('#nombreComercial_container');

const provincia_container = document.querySelector('#provincia_container');
const canton_container = document.querySelector('#canton_container');
const distrito_container = document.querySelector('#distrito_container');
const sennas_container = document.querySelector('#sennas_container');

const nombreCompleto_container = document.querySelector('#nombre_container');
const correo_container = document.querySelector('#correo_container');
const telefono_container = document.querySelector('#telefono_container');
const genero_container = document.querySelector('#genero_container');

let mostrarInfo = async () =>{

    let organizador = await obtenerDatos();
    //console.log(organizador);

    let nombreEmpresa = organizador.organizador.nombreEmpresa;
    let pNombreEmpresa = document.createElement('h6');
    pNombreEmpresa.innerText = nombreEmpresa;
    nombreEmpresa_container.appendChild(pNombreEmpresa);

    let cedulaJuridica = organizador.organizador.cedulaJuridica;
    let pCedulaJuridica = document.createElement('h6');
    pCedulaJuridica.innerText = cedulaJuridica;
    cedulaJuridica_container.appendChild(pCedulaJuridica);

    let experiencia = organizador.organizador.experiencia;
    let pExperiencia = document.createElement('h6');
    pExperiencia.innerText = experiencia;
    experiencia_container.appendChild(pExperiencia);

    let nombreComercial = organizador.organizador.nombreComercial;
    let pNombreComercial = document.createElement('h6');
    pNombreComercial.innerText = nombreComercial;
    nombreComercial_container.appendChild(pNombreComercial);

    let provincia = organizador.organizador.provincia;
    let pProvincia = document.createElement('h6');
    pProvincia.innerText = provincia;
    provincia_container.appendChild(pProvincia);

    let canton = organizador.organizador.canton;
    let pCanton = document.createElement('h6');
    pCanton.innerText = canton;
    canton_container.appendChild(pCanton);
    
    let distrito = organizador.organizador.distrito;
    let pDistrito = document.createElement('h6');
    pDistrito.innerText = distrito;
    distrito_container.appendChild(pDistrito);

    let sennas = organizador.organizador.sennas;
    let pSennas = document.createElement('h6');
    pSennas.innerText = sennas;
    sennas_container.appendChild(pSennas);

    let nombreCompleto = organizador.organizador.nombreCompleto;
    let pNombreCompleto = document.createElement('h6');
    pNombreCompleto.innerText = nombreCompleto;
    nombreCompleto_container.appendChild(pNombreCompleto);
    
    let correo = organizador.organizador.correo;
    let pCorreo = document.createElement('h6');
    pCorreo.innerText = correo;
    correo_container.appendChild(pCorreo);

    let telefono = organizador.organizador.telefono;
    let pTelefono = document.createElement('h6');
    pTelefono.innerText = telefono;
    telefono_container.appendChild(pTelefono);

    let genero = organizador.organizador.genero;
    let pGenero = document.createElement('h6');
    pGenero.innerText = genero;
    genero_container.appendChild(pGenero);

    
};
mostrarInfo();
