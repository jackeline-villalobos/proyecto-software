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
    foto_perfil_container.appendChild(img);

    

};

mostrarInfo();