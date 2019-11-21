'use strict';

let idUsuario = sessionStorage.getItem('idUsuario');
//const mainContainer = document.querySelector('#main-container');

const pNombre = document.querySelector('#nombre');
const pCorreo = document.querySelector('#correo');
const pGenero = document.querySelector('#genero');
const pDireccion = document.querySelector('#direccion');
const pProvincia = document.querySelector('#provincia');
const pDistrito = document.querySelector('#distrito');
const pCanton = document.querySelector("#canton");



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