'use strict';

const contenedor = document.querySelector('#contenedorCards');
const inputFiltro = document.querySelector('#txt-filtro');


const inputInicio = document.querySelector('#txt-inicio');
const inputFin = document.querySelector('#txt-fin');

const botonBuscar = document.querySelector('#btn-buscar');


let mostrarCards = async () => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaEventos = await listarEventos();

    

    contenedor.innerHTML = '';

    for (let i = 0; i < listaEventos.length; i++) {
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
            precio.innerText = 'Precio: ₡' + listaEventos[i]['precioEntrada'];

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
    };
};
mostrarCards();





// const contenedor = document.querySelector('#contenedorCards');
// const inputFiltro = document.querySelector('#txt-filtro');





let mostrarCardsPorFecha = async (inicio, fin) => {
    // let filtro = inputFiltro.value.toLowerCase();
    let listaEventos = await listarEventos();

    

    contenedor.innerHTML = '';

    inicio = inputInicio.value;
    fin = inputFin.value;

    for (let i = 0; i < listaEventos.length; i++) {



        let nombre = listaEventos[i]['nombre'].toLowerCase();
        let imagen = listaEventos[i]['imagen'];

        // let fechaHoy = new Date();


        for (let j = 0; j < listaEventos[i]['fechas'].length; j++) {



            let fechaEvento = new Date(listaEventos[i]['fechas'][j]['fecha'] + " " + listaEventos[i]['fechas'][j]['hora']);
            

            if (inicio >= fin) {
                let fechaEvento = new Date(listaEventos[i]['fechas'][j]['fecha']);
                if (fechaEvento >= new Date(inicio) && fechaEvento <= new Date(fin)) {
                    let cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    let header = document.createElement('header');
                    header.style.backgroundImage = 'url, (`${imagen}`)';
                    let img = document.createElement('img');
                    img.src = `${imagen}`;

                    let nombre = document.createElement('h2');
                    nombre.innerText = listaEventos[i]['nombre'];

                    let fecha = document.createElement('h3');
                    

                    fecha.innerText = 'Fechas: ' + listaEventos[i]['fechas'][j]['fecha'];



                    let lugar = document.createElement('h4');
                    lugar.innerText = 'Lugar: ' + listaEventos[i]['lugar'];

                    let precio = document.createElement('h4');
                    precio.innerText = 'Precio: ₡' + listaEventos[i]['precioEntrada'];

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

            




        }
    };
};
// mostrarCardsPorFecha(inicio, fin);
inputFiltro.addEventListener('keyup', mostrarCards);
// inputFiltro.addEventListener('keyup', mostrarCards());

// botonBuscar.addEventListener('click', mostrarCardsPorFecha(inicio, fin));