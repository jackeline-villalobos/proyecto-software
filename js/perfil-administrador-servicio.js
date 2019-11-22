'use strict';

let idUsuario = sessionStorage.getItem('idUsuario');
//const mainContainer = document.querySelector('#main-container');

const aNombre = document.querySelector('#nombre');
const aCorreo = document.querySelector('#correo');
const aGenero = document.querySelector('#genero');
const aDireccion = document.querySelector('#direccion');
const aProvincia = document.querySelector('#provincia');
const aDistrito = document.querySelector('#distrito');
const aCanton = document.querySelector("#canton");



let llenarPerfil = async() => {
    let usuario = await buscarUsuario(idUsuario);
    console.log(usuario);

    let nombre = usuario.usuario.nombre;
    pNombre.innerHTML = "Nombre" + nombre;

    let correo = usuario.usuario.correo;
    pCorreo.innerHTML = 'Correo: ' + correo;

    let genero = usuario.usuario.genero;
    pGenero.innerHTML = 'Grado: ' + genero;

    let direccion = usuario.usuario.direccion;
    pDireccion.innerHTML = "Direccion" + direccion;

    let provincia = usuario.usuario.provincia;
    pProvincia.innerHTML = "Provincia" + provincia;

    let distrito = usuario.usuario.distrito;
    pDistrito.innerHTML = "Distrito" + distrito;

    let canton = usuario.usuario.canton;
    pCanton.innerHTML = "Canton" + canton;




}

llenarPerfil();