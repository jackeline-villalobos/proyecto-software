'use strict';

//let idUsuario = sessionStorage.getItem('idUsuario');
//const mainContainer = document.querySelector('#main-container');

const aNombre = document.querySelector('#nombre');
const aCorreo = document.querySelector('#correo');
const aGenero = document.querySelector('#genero');
const aDireccion = document.querySelector('#direccion');
const aProvincia = document.querySelector('#provincia');
const aDistrito = document.querySelector('#distrito');
const aCanton = document.querySelector("#canton");

const container = document.querySelector("#container-2");


let llenarPerfil = async() => {
    let usuario = await obtenerDatos();
    console.log(usuario);

    let parafo1 = document.createElement("p");

    let parafo20 = document.createElement("label");
    let parafo2 = document.createElement("p");

    let parafo30 = document.createElement("label");
    let parafo3 = document.createElement("p");

    let parafo40 = document.createElement("label");
    let parafo4 = document.createElement("p");

    let parafo50 = document.createElement("label");
    let parafo5 = document.createElement("p");

    let parafo60 = document.createElement("label");
    let parafo6 = document.createElement("p");



    parafo1.innerHTML = usuario.primerNombre;

    parafo20.innerHTML = "Correo:" + "<br>" + usuario.correo;
    //parafo2.innerHTML = usuario.correo;

    parafo30.innerHTML = "Género:" + "<br>" + usuario.genero;
    //parafo3.innerHTML = usuario.genero;

    parafo40.innerHTML = "Dirección:" + "<br>" + usuario.direccion + "<br>" + usuario.provincia + "<br>" + usuario.canton;
    //parafo4.innerHTML = usuario.direccion + "<br>" + usuario.provincia + "<br>" + usuario.canton;

    /*
        parafo5.innerHTML = usuario.provincia;


        parafo6.innerHTML = usuario.canton;
    */

    container.appendChild(parafo1);

    container.appendChild(parafo20);
    container.appendChild(parafo2);

    container.appendChild(parafo30);
    container.appendChild(parafo3);

    container.appendChild(parafo40);
    container.appendChild(parafo4);

    /*
        container.appendChild(parafo5);


        container.appendChild(parafo6);
    */


    /*
    let nombre = usuario.usuario.nombre;
    aNombre.innerHTML = "Nombre" + nombre;

    let correo = usuario.usuario.correo;
    aCorreo.innerHTML = 'Correo: ' + correo;

    let genero = usuario.usuario.genero;
    aGenero.innerHTML = 'Grado: ' + genero;

    let direccion = usuario.usuario.direccion;
    aDireccion.innerHTML = "Direccion" + direccion;

    let provincia = usuario.usuario.provincia;
    aProvincia.innerHTML = "Provincia" + provincia;

    let distrito = usuario.usuario.distrito;
    aDistrito.innerHTML = "Distrito" + distrito;

    let canton = usuario.usuario.canton;
    aCanton.innerHTML = "Canton" + canton;
*/



}


llenarPerfil();