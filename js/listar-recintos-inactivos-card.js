'use strict';

const contenedor = document.querySelector('#cards-container');
const inputFiltro = document.querySelector('#txt-filtro');

// const btnBuscar = documet.querySelector('#txt-btn-buscar');


let mostrarCards = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaRecintos = await listarRecintos();
    console.log(listaRecintos);

    contenedor.innerHTML = '';

    for (let i = 0; i < listaRecintos.length; i++) {

        let estado = listaRecintos[i]['estado'];
        console.log(estado);

        if(estado == 'inactivo') {

            let nombre = listaRecintos[i]['nombreRecinto'].toLowerCase();

        if(nombre.includes(filtro)){
            
            let imagen = listaRecintos[i]['imagen'];
    
            let divCard = document.createElement('div');
            divCard.classList.add('card');
    
            let header = document.createElement('header');
            header.style.backgroundImage = 'url, (`${imagen}`)';
            //console.log(imagen);
            let img = document.createElement('img');
            img.src = `${imagen}`;
    
            let titulo = document.createElement('h2');
            titulo.innerText = listaRecintos[i]['nombreRecinto'];
    
            let provincia = document.createElement('h3');
            provincia.innerText = listaRecintos[i]['provincia'];
    
            let capacidad = document.createElement('h4');
            capacidad.innerText = 'Capacidad: ' + listaRecintos[i]['capacidad'] + ' personas';
    
            let boton = document.createElement('button');
            boton.classList.add('btn-mas');
            boton.innerHTML = 'Ver más';
            boton.dataset._id = listaRecintos[i]['_id'];
            boton.dataset.nombreRecinto = listaRecintos[i]['nombreRecinto'];
    
            boton.addEventListener('click', function () {
                sessionStorage.setItem('idRecinto', this.dataset._id);
                sessionStorage.setItem('nombreRecinto', this.dataset.nombreRecinto);
                window.location.href = 'perfil-recinto.html';
            });
    
            contenedor.appendChild(divCard);
            divCard.appendChild(header);
            header.appendChild(img);
            divCard.appendChild(titulo);
            divCard.appendChild(provincia);
            divCard.appendChild(capacidad);
            divCard.appendChild(boton);

        }

        }
        
        
    }
};

mostrarCards();
inputFiltro.addEventListener('keyup', mostrarCards);