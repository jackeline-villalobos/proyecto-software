'use strict';

let idEvento = localStorage.getItem('idEvento');

const imagen = document.querySelector('#imagen');
const h2_nombreEvento = document.querySelector('#h2-nombreEvento');
const p_descripcion = document.querySelector('#p-descripcion');

const div_fechas = document.querySelector('#div-fechas');
const h5_recinto = document.querySelector('#h5-recinto');

let llenarEvento = async () =>{

    let evento = await buscarEvento(idEvento);

    //console.log(evento);

    let imagenSource = evento.evento.imagen;
    imagen.src = `${imagenSource}`;

    let nombreEvento = evento.evento.nombre;
    h2_nombreEvento.innerHTML = nombreEvento;

    let descripcion = evento.evento.descripcion;
    p_descripcion.innerHTML = descripcion;

    let lugar = evento.evento.lugar;
    h5_recinto.innerHTML = lugar;
    
    let fechasArray = evento.evento.fechas;

    for(let i = 0; i < fechasArray.length; i++){
        let fecha = evento.evento.fechas[i];

        let dia = document.createElement('h6');
        dia.innerHTML = 'Fecha : ' + fechasArray[i]['fecha'];
        dia.classList.add('date')
        let hora = document.createElement('h6');
        hora.innerHTML = 'Hora : ' + fechasArray[i]['hora'];
        hora.classList.add('time')

        let divBotones = document.createElement('div');
        divBotones.classList.add('botones')

        let btnComprar = document.createElement('button');
        btnComprar.classList.add('boton', 'botonVerde');
        btnComprar.innerHTML = 'Comprar';

        let btnReservar = document.createElement('button');
        btnReservar.classList.add('boton');
        btnReservar.innerHTML = 'Reservar';

        divBotones.appendChild(btnComprar);
        divBotones.appendChild(btnReservar);
        div_fechas.appendChild(dia);
        div_fechas.appendChild(hora);
        div_fechas.appendChild(divBotones);
        
    }

    let nombreRecinto = evento.evento.lugar;

    let recinto = await obtenerRecinto(nombreRecinto);
    //console.log(recinto);

    let latitud = parseFloat(recinto[0].latitud);
    console.log(latitud);

    let longitud = parseFloat(recinto[0].longitud);
    console.log(longitud);

    initMap(latitud, longitud);


};

llenarEvento();