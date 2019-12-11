'use strict';
const contenedorEntrada = document.querySelector('#contenedor-entrada');
const userID = sessionStorage.getItem('idUsuario');
const btnPagar = document.querySelector('#btn-pagar');


let llenarCarrito = async () => {

    let usuario = await buscarUsuarioCorreo();

    let listaEventos = await listarEventos();

    let eventosUsuario = usuario.usuario.entradas;

    console.log(eventosUsuario);

    if(eventosUsuario.length == 0) {
        let titulo = document.createElement('h2');
        titulo.setAttribute('id', 'titulo-sin-entrada');
        titulo.innerHTML = 'No tienes ninguna entrada en tu carrito';
        contenedorEntrada.appendChild(titulo);
        btnPagar.classList.add('ocultar');
    } else {

        for(let i in eventosUsuario){
            //console.log(eventosUsuario[i]['idEvento'])
    
            for(let j in listaEventos) {
                if(eventosUsuario[i]['idEvento'] == listaEventos[j]['_id']){
                    let imagen = listaEventos[j]['imagen'];
                    let nombreEvento = listaEventos[j]['nombre'];
                    let nombreRecinto = listaEventos[j]['lugar'];
                    let numeroEntradas = eventosUsuario[i]['numeroEntradas'];
                    let fechaEvento = eventosUsuario[i]['fechaEvento'];
                    let precioEntrada = listaEventos[j]['precioEntrada'];
    
                    //console.log(listaEventos[j]['precioEntrada']);
    
                    let divInfoEvento = document.createElement('div');
                    divInfoEvento.setAttribute('class', 'info-evento');
                    
    
                    let imagenEvento = document.createElement('img');
                    imagenEvento.setAttribute('src', `${imagen}`);
                    let containerImagen = document.createElement('div');
                    containerImagen.setAttribute('class', 'imagen-container');
                    containerImagen.appendChild(imagenEvento);
    
                    let tituloEvento = document.createElement('h2');
                    tituloEvento.innerHTML = nombreEvento;
    
                    let tituloRecinto = document.createElement('h3');
                    tituloRecinto.innerHTML = nombreRecinto;
    
                    let containerInfo = document.createElement('div');
                    containerInfo.setAttribute('class', 'info-container');
                    containerInfo.appendChild(tituloEvento);
                    containerInfo.appendChild(tituloRecinto);
    
                    divInfoEvento.appendChild(containerImagen);
                    divInfoEvento.appendChild(containerInfo);
                    // divInfoEvento.appendChild(tituloRecinto);
    
                    let divInfoEntrada = document.createElement('div');
                    let tituloDivInfo = document.createElement('h2');
                    let numEntradas = document.createElement('h3');
                    numEntradas.innerHTML = 'Entradas: ' + numeroEntradas
                    tituloDivInfo.innerHTML = 'Cantidad de entradas';
    
                    let tituloFecha = document.createElement('h3');
                    tituloFecha.innerHTML = 'Fecha: ' +  fechaEvento;
    
                    divInfoEntrada.appendChild(tituloDivInfo);
                    divInfoEntrada.appendChild(numEntradas);
                    divInfoEntrada.appendChild(tituloFecha);
    
                    let divInfoPago = document.createElement('div');
                    let tituloInfoPago = document.createElement('h2');
                    tituloInfoPago.innerHTML = 'Precio a pagar';
    
                    let infoPrecio = document.createElement('h3');
                    let precio = parseInt(precioEntrada);
                    let entradas = parseInt(numeroEntradas);
                    let precioFinal = precio * entradas;
                    //console.log(entradas);
                    infoPrecio.innerHTML = '₡' + precioFinal;
    
                    let botonEliminar = document.createElement('button');
                    botonEliminar.setAttribute('id', 'btn-eliminar');
                    botonEliminar.innerHTML = 'Eliminar entrada'
    
                    divInfoPago.appendChild(tituloInfoPago);
                    divInfoPago.appendChild(infoPrecio);
                    divInfoPago.appendChild(botonEliminar);
    
                    let entradaContainer = document.createElement('div');
                    entradaContainer.setAttribute('class', 'entrada-container');
    
                    entradaContainer.appendChild(divInfoEvento);
                    entradaContainer.appendChild(divInfoEntrada);
                    entradaContainer.appendChild(divInfoPago);
    
                    contenedorEntrada.appendChild(entradaContainer);
    
                    console.log(eventosUsuario[i]['_id']);
    
                    let idEntrada = eventosUsuario[i]['_id'];
    
                    botonEliminar.addEventListener('click', async function(e){
                        e.preventDefault();
                        
                        let resultado = await eliminarEntrada(userID, idEntrada);
    
                        if(resultado.resultado) {
                            Swal.fire({
                                icon: 'success',
                                title: 'La entrada ha sido eliminada',
                                confirmButtonText: 'Entendido',
                                onClose: function() {
                                    location.reload();
                                }
                            });
                        
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'No se ha podido eliminar la entrada',
                                text: 'Algo salió mal, inténtelo de nuevo',
                                confirmButtonText: 'Entendido'
                            });
                        }
                    });
    
                }
            }
        }

    }

}

llenarCarrito();