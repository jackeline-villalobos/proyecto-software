'use strict'

const foto_perfil_container = document.querySelector('#foto_perfil_container');
const nombre_container = document.querySelector('#nombre_container');
const informacion_container = document.querySelector('#informacion_container');
const direccion_container = document.querySelector('direccion_container');
const _id = sessionStorage.getItem('idUsuario');



let mostrarInfo = async() => {

    let usuario = await obtener_datos();
    console.log(usuario);


    let imagen = usuario.imagen;
    let img = document.createElement('img');
    img.src = `${imagen}`;
    foto_perfil_container.style.backgroundimage(img);

    /*
    let nombre = document.createElement('h3');
    nombre.innerText = listarUsuarios[i]['primerNombre'];
    nombre_container.appendChild(nombre);


    let cumpleannos = document.createElement('p');
    cumpleannos.innerText = listarUsuarios[i]['fechaDeNacimiento'];

    let correo = document.createElement('p');
    correo.innerText = listarUsuarios[i]['correo'];

    let genero = document.createElement('p');
    genero.innerText = listarUsuarios[i]['genero'];

    informacion_container.appendChild(cumpleannos);
    informacion_container.appendChild(correo);
    informacion_container.appendChild(genero);

    let direccion = document.createElement('p');
    direccion.innerText = listarUsuarios[i]['direccion'];

    let provincia = document.createElement('p');
    provincia.innerText = listarUsuarios[i]['provincia'];

    let canton = document.createElement('p');
    canton.innerText = listarUsuarios[i]['canton'];

    let distrito = document.createElement('p');
    distrito.innerText = listarUsuarios[i]['distrito'];


    direccion_container.appendChild(direccion);
    direccion_container.appendChild(provincia);
    direccion_container.appendChild(canton);
    direccion_container.appendChild(distrito);
*/


};

mostrarInfo();