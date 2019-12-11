'use strict';

let idEvento = localStorage.getItem('idEvento');

const imagen = document.querySelector('#imagen');
const h2_nombreEvento = document.querySelector('#h2-nombreEvento');
const p_descripcion = document.querySelector('#p-descripcion');
const h4_precio = document.querySelector('#precio');
const div_fechas = document.querySelector('#div-fechas');
const h5_recinto = document.querySelector('#h5-recinto');

let llenarEvento = async () =>{

    let evento = await buscarEvento(idEvento);

    //console.log(evento)

    let imagenSource = evento.evento.imagen;
    imagen.src = `${imagenSource}`;

    let nombreEvento = evento.evento.nombre;
    h2_nombreEvento.innerHTML = nombreEvento;

    let descripcion = evento.evento.descripcion;
    p_descripcion.innerHTML = descripcion;

    let lugar = evento.evento.lugar;
    h5_recinto.innerHTML = lugar;

    let precio = evento.evento.precioEntrada;
    h4_precio.innerHTML = '₡'+ precio;
    
    let fechasArray = evento.evento.fechas;

    for(let i = 0; i < fechasArray.length; i++){
        let fecha = evento.evento.fechas[i];

        let dia = document.createElement('h6');
        dia.innerHTML = fechasArray[i]['fecha'];
        dia.classList.add('date')
        let hora = document.createElement('h6');
        hora.innerHTML = fechasArray[i]['hora'];
        hora.classList.add('time')
        let entradas = document.createElement('h6')
        entradas.innerHTML = 'Entradas disponibles: '+fechasArray[i]['cantidadAsistentes'];
        entradas.classList.add('entradas')

        let divBotones = document.createElement('div');
        divBotones.classList.add('botones')

        let btnComprar = document.createElement('button');
        btnComprar.classList.add('boton', 'botonVerde');
        
        let eventoProximo = evento.evento.proximo;
        console.log(eventoProximo);
        // let btnAgregarCarrito = document.querySelector('#btn-annadir-carrito');

        if(eventoProximo == false) {
          btnComprar.classList.add('ocultar');
          entradas.innerHTML = 'Este evento ha finalizado.';
        }
        

        btnComprar.innerHTML = 'Añadir al carrito';

        // let btnReservar = document.createElement('button');
        // btnReservar.classList.add('boton');
        // btnReservar.innerHTML = 'Reservar';

        divBotones.appendChild(btnComprar);
        // divBotones.appendChild(btnReservar);
        div_fechas.appendChild(dia);
        div_fechas.appendChild(hora);
        div_fechas.appendChild(entradas);
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

let marcarEventoFinalizado =async()=>{

    let resultado = await eventoFinalizado(idEvento);
    console.log(resultado)
    

};

btn_finalizado.addEventListener('click', async function(){
    Swal.fire({
        title: '¿Desea marcar el evento como finalizado?',
        text: "Esta acción detiene la compra de entradas y habilita funciones de interacción",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1EBB2D',
        cancelButtonColor: '#F2610A',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
            marcarEventoFinalizado()
          Swal.fire(
            'Evento finalizado',
            'El evento ha sido marcado como finalizado.',
            'success'
          )
        }
      })
});

llenarEvento();