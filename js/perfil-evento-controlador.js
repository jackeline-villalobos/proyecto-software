'use strict';

let idEvento = localStorage.getItem('idEvento');

const imagen = document.querySelector('#imagen');
const h2_nombreEvento = document.querySelector('#h2-nombreEvento');
const p_descripcion = document.querySelector('#p-descripcion');
const h4_precio = document.querySelector('#precio');
const div_fechas = document.querySelector('#div-fechas');
const h5_recinto = document.querySelector('#h5-recinto');
const mostrarComentarios = document.querySelector('#mostrarComentarios');
const input_comentario = document.querySelector('#txt-comentario');
const input_calificacion = document.querySelector('#txt-calificacion');
const botonComentar = document.querySelector('#btn-comentar');
const botonCalificar = document.querySelector('#btn-calificar');




let llenarEvento = async () => {

  let evento = await buscarEvento(idEvento);


  let imagenSource = evento.evento.imagen;
  imagen.src = `${imagenSource}`;

  let nombreEvento = evento.evento.nombre;
  h2_nombreEvento.innerHTML = nombreEvento;

  let descripcion = evento.evento.descripcion;
  p_descripcion.innerHTML = descripcion;

  let lugar = evento.evento.lugar;
  h5_recinto.innerHTML = lugar;

  let precio = evento.evento.precioEntrada;
  h4_precio.innerHTML = '₡' + precio;

  let fechasArray = evento.evento.fechas;

  let comentariosArray = evento.evento.comentarios;

  let calificacionesArray = evento.evento.calificaciones;

  for (let i = 0; i < fechasArray.length; i++) {
    let fecha = evento.evento.fechas[i];

    let dia = document.createElement('h6');
    dia.innerHTML = fechasArray[i]['fecha'];
    dia.classList.add('date')
    let hora = document.createElement('h6');
    hora.innerHTML = fechasArray[i]['hora'];
    hora.classList.add('time')
    let entradas = document.createElement('h6')
    entradas.innerHTML = 'Entradas disponibles: ' + fechasArray[i]['cantidadAsistentes'];
    entradas.classList.add('entradas')

    let divBotones = document.createElement('div');
    divBotones.classList.add('botones')

    let btnComprar = document.createElement('button');
    btnComprar.classList.add('boton', 'botonVerde');

    let eventoProximo = evento.evento.proximo;
    // let btnAgregarCarrito = document.querySelector('#btn-annadir-carrito');

    if (eventoProximo == false) {
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

    let asistentes = parseInt(evento.evento.fechas[i]['cantidadAsistentes']);

    btnComprar.addEventListener('click', function () {
      Swal.fire({
        text: 'Ingrese el número de entradas que desea comprar',
        input: 'number',
        allowEscapeKey: false,
        allowOutsideClick: false
      }).then(function (entradas) {
        console.log(asistentes);
        if (entradas.value > asistentes) {
          Swal.fire({
            icon: 'warning',
            title: 'No puedes comprar más entradas de las disponibles',
            confirmButtonText: 'Entendido'
          });
        } else if (entradas.value <= 0 || entradas.value == '') {
          Swal.fire({
            icon: 'error',
            title: 'No has ingresado la cantidad de entradas',
            confirmButtonText: 'Entendido'
          });
        } else {

          let agregarEntrada = async () => {
            let entradasCompradas = entradas.value;
            let userId = sessionStorage.getItem('idUsuario');
            let fechaCompra = fechasArray[i]['fecha'];
            console.log(fechaCompra);
            let resultado = await agregarCarritoCompras(userId, idEvento, entradasCompradas, fechaCompra);

            if (resultado.resultado == true) {

              Swal.fire({
                icon: 'success',
                title: 'Se han agregado al carrito de compras',
                confirmButtonText: 'Entendido',
                onClose: async function () {
                  location.reload();
                }
              });
            }
          }

          agregarEntrada();

        }
      });
    });

  }

  for (let y = 0; y < comentariosArray.length; y++) {
    let comentarioContainer = document.createElement('div');
    comentarioContainer.classList.add('comentarioContainer');

    //comentarioContainer.style.backgroundImage = 'url'+comentariosArray[y]['fotoUsuario']
      let fotoUsuario = document.createElement('img')
      fotoUsuario.src = comentariosArray[y]['fotoUsuario']
      fotoUsuario.classList.add('fotoUsuario')

    let nombreUsuario = document.createElement('p')
    nombreUsuario.innerHTML = comentariosArray[y]['nombreUsuario'] + ':'
    nombreUsuario.classList.add('nombreUsuario')

    let comentario = document.createElement('p')
    comentario.innerHTML = comentariosArray[y]['comentario']
    comentario.classList.add('comentario')

    comentarioContainer.appendChild(fotoUsuario)
    comentarioContainer.appendChild(nombreUsuario)
    comentarioContainer.appendChild(comentario)
    mostrarComentarios.appendChild(comentarioContainer)
  }; //fin for comentarios

  for(let x = 0; x < calificacionesArray.length; x++){


    
  };//fin for calificaciones

  let nombreRecinto = evento.evento.lugar;

  let recinto = await obtenerRecinto(nombreRecinto);
  //console.log(recinto);

  let latitud = parseFloat(recinto[0].latitud);

  let longitud = parseFloat(recinto[0].longitud);

  initMap(latitud, longitud);


};

let marcarEventoFinalizado = async () => {

  let resultado = await eventoFinalizado(idEvento);


};

btn_finalizado.addEventListener('click', async function () {
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

let validarComentario = () => {
  let error = false;
  if (input_comentario.value == '') {
    error = true;
    input_comentario.classList.add('error');
  } else {
    input_comentario.classList.remove('error');
  };
  return error;
}

let validarCalificacion =async () => {
  let error = false;
  let evento = await buscarEvento(idEvento);
  let calificacionesArray = evento.evento.calificaciones;
  let idUsuario = sessionStorage.getItem('idUsuario')
  for(let i = 0; i < calificacionesArray.length; i++){
    if(idUsuario == calificacionesArray[i]['idUsuario']){
        error = true
        input_calificacion.classList.add('error')
    } else {
      input_calificacion.classList.remove('error');
    };
  }

  if(input_calificacion.value > 5 || input_calificacion.value == ''){
    error = true;
    input_calificacion.classList.add('error');
  } else {
    input_calificacion.classList.remove('error');
  };
  return error;
}


let agregarComentario = async () => {
  let fotoUsuario = sessionStorage.getItem('fotoUsuario')
  let nombreUsuario = sessionStorage.getItem('nombreUsuario') + ' ' + sessionStorage.getItem('apellidoUsuario');
  let comentario = input_comentario.value;

  if (validarComentario()) {
    Swal.fire({
      type: 'warning',
      title: 'Comentario vacío',
      confirmButtonText: 'Entendio'
    })
  } else {
    agregar_comentario(fotoUsuario, nombreUsuario, comentario)
    input_comentario.value = ''
    location.reload(); 
  }
};

let agregarCalificaion = async () => {
  let idUsuario = sessionStorage.getItem('idUsuario')
  let calificacion = input_calificacion.value;

  if (validarCalificacion()) {
    Swal.fire({
      type: 'warning',
      title: 'No se pudo guardar la calificación',
      text: 'Puede que haya ingresado un valor mayor a 5 o usted ya haya calificado',
      confirmButtonText: 'Entendio'
    })
  } else {
    agregar_calificacion(idUsuario, calificacion)
    input_calificacion.value = ''
    location.reload(); 
  }
};

botonCalificar.addEventListener('click', agregarCalificaion)
botonComentar.addEventListener('click', agregarComentario)
// botonComentar.addEventListener('click', function(e){
//   e.preventDefault();
//   agregarComentario();
//   input_comentario.value = ''
// });



llenarEvento();