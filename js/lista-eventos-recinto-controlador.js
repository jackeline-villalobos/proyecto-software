'use strict';


const contenedor = document.querySelector('#contenedorCards');
const inputFiltro = document.querySelector('#txt-filtro');
const nombredeRecinto = sessionStorage.getItem('nombreRecinto');

let mostrarCards = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaEventos = await listarEventos();

    console.log(nombredeRecinto);
    console.log(listaEventos);

    contenedor.innerHTML = '';

    for (let i = 0; i < listaEventos.length; i++) {

        if (listaEventos[i]['lugar'] == nombredeRecinto) {

            let nombre = listaEventos[i]['nombre'].toLowerCase();
            let imagen = listaEventos[i]['imagen'];

            if (nombre.includes(filtro)) {
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                let header = document.createElement('header');
                header.style.backgroundImage = 'url, (`${imagen}`)';
                let img = document.createElement('img');
                img.src = `${imagen}`;

                let nombre = document.createElement('h2');
                nombre.innerText = listaEventos[i]['nombre'];

                let fecha = document.createElement('h3');
                for (let y = 0; y < listaEventos[i]['fechas'].length; y++) {
                    fecha.innerText = 'Fechas: ' + listaEventos[i]['fechas'][y]['fecha'];
                }


                let lugar = document.createElement('h4');
                lugar.innerText = 'Lugar: ' + listaEventos[i]['lugar'];

                let precio = document.createElement('h4');
                precio.innerText = 'Precio: ' + listaEventos[i]['precioEntrada'];

                let boton = document.createElement('button');
                boton.classList.add('btn-mas');
                boton.innerHTML = 'Ver más';
                boton.dataset._id = listaEventos[i]['_id'];

                boton.addEventListener('click', function () {
                    localStorage.setItem('idEvento', this.dataset._id);
                    window.location.href = 'perfil-evento.html';
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

        }
    };
};


mostrarCards();
inputFiltro.addEventListener('keyup', mostrarCards);