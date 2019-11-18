'use strict';

const contenedor = document.querySelector('#contenedorCards');
const inputFiltro = document.querySelector('#txt-filtro');


let mostrarCards = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaEventos = await listarEventos();

    console.log(listaEventos)

    contenedor.innerHTML = '';
    
    for(let i = 0; i < listaEventos.length; i ++){
        let nombre = listaEventos[i]['nombre'].toLowerCase();
        let imagen = listaEventos[i]['imagen'];

        if(nombre.includes(filtro)) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            let header = document.createElement('header');
            header.style.backgroundImage = 'url, (`${imagen}`)';
            console.log(imagen);
            let img = document.createElement('img');
            img.src = `${imagen}`;            

            let nombre = document.createElement('h2');
            nombre.innerText = listaEventos[i]['nombre'];

            let fecha = document.createElement('h3');
            fecha.innerText = listaEventos[i]['fecha'];

            let lugar = document.createElement('h4');
            lugar.innerText = listaEventos[i]['lugar'];

            let precio = document.createElement('h4');
            precio.innerText = listaEventos[i]['precioEntrada'];

            let boton = document.createElement('button');
            boton.classList.add('btn-mas');
            boton.innerHTML = 'Ver más';
            boton.dataset._id = listaEventos[i]['_id'];

            boton.addEventListener('click', function() {
                localStorage.setItem('idEvento', this.dataset._id);
                window.location.href = '#';
            });

            contenedor.appendChild(cardDiv);
            cardDiv.appendChild(header);
            header.appendChild(img);
            cardDiv.appendChild(nombre);
            cardDiv.appendChild(fecha);
            cardDiv.appendChild(lugar);
            cardDiv.appendChild(precio);
            cardDiv.appendChild(boton);
        }
    };
};
mostrarCards();
inputFiltro.addEventListener('keyup', mostrarCards);

// let mostrarCards = async () => {
//     let filtro = inputFiltro.value.toLowerCase();
    
//     listaEventos = await listarEventos();

//     contenedor.innerHTML = '';
//     for (let i = 0; i < listaEventos.length; i++) {
//        let div_card = document.createElement('div');
//        div_card.classList.add('card');
       
//        let header = document.createElement('header');

//        let titulo = document.createElement('h5');
//        titulo.innerText = listaEventos[i]['nombre'];

//        let precio = document.createElement('h6');
//        precio.innerText = listaEventos[i]['precio'];

//        let descripcion = document.createElement('p');
//        descripcion.innerText = listaEventos[i]['descripcion'];

//        let boton = document.createElement('button');
//        boton.classList.add('btn-mas');
//        boton.innerText = 'Ver más';
//        boton.dataset._id = listaEventos[i]['_id'];

//        boton.addEventListener('click', function(){
//            localStorage.setItem('id_evento', this.dataset._id);
//            window.location.href = 'perfil-evento.html'
//        });

//        contenedor.appendChild(div_card);
//        div_card.appendChild(header);
//        div_card.appendChild(titulo);
//        div_card.appendChild(precio);
//        div_card.appendChild(descripcion);
//        div_card.appendChild(boton);
//     };

// };

//mostrarCards();
//inputFiltro.addEventListener('keyup', mostrarCards);
