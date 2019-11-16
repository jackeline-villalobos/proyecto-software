'use strict';

const contenedor = document.querySelector('.contenedorCards');
const inputFiltro = document.querySelector('#txt-filtro');

let listaEventos;

let mostrarCards = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    
    listaEventos = await listarEventos();

    contenedor.innerHTML = '';
    for (let i = 0; i < listaEventos.length; i++) {
       let div_card = document.createElement('div');
       div_card.classList.add('card');
       
       let header = document.createElement('header');

       let titulo = document.createElement('h5');
       titulo.innerText = listaEventos[i]['nombre'];

       let precio = document.createElement('h6');
       precio.innerText = listaEventos[i]['precio'];

       let descripcion = document.createElement('p');
       descripcion.innerText = listaEventos[i]['descripcion'];

       let boton = document.createElement('button');
       boton.classList.add('btn-mas');
       boton.innerText = 'Ver más';
       boton.dataset._id = listaEventos[i]['_id'];

       boton.addEventListener('click', function(){
           localStorage.setItem('id_evento', this.dataset._id);
           window.location.href = 'perfil-evento.html'
       });

       contenedor.appendChild(div_card);
       div_card.appendChild(header);
       div_card.appendChild(titulo);
       div_card.appendChild(precio);
       div_card.appendChild(descripcion);
       div_card.appendChild(boton);
    };

};

mostrarCards();
inputFiltro.addEventListener('keyup', mostrarCards);