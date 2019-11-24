'use strict';

let idEvento = sessionStorage.getItem('idEvento');

const imagen = document.querySelector('#imagen');
const h2_nombreEvento = document.querySelector('#h2-nombreEvento');
const p_descripcion = document.querySelector('#p-descripcion');

const div_fechas = document.querySelector('#div-fechas')

let llenarEvento = async () =>{

    let evento = await buscarEvento(idEvento);

    //console.log(evento);

    let imagenSource = evento.evento.imagen;
    imagen.src = `${imagenSource}`;

    let nombreEvento = evento.evento.nombre;
    h2_nombreEvento.innerHTML = nombreEvento;

    let descripcion = evento.evento.descripcion;
    p_descripcion.innerHTML = descripcion;

    
    let fechasArray = evento.evento.fechas;

    for(let i = 0; i < fechasArray.length; i++){
        let fecha = evento.evento.fechas[i];

        let dia = document.createElement('h6');
        dia.innerHTML = 'Fecha: ' + fechasArray[i]['fecha'];
        let hora = document.createElement('h6');
        hora.innerHTML = 'Hora: ' + fechasArray[i]['hora'];

        div_fechas.appendChild(dia);
        div_fechas.appendChild(hora);
    }

};

llenarEvento();