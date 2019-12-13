'use strict';
const contenedorEntrada = document.querySelector('#contenedor-entrada');
const userID = sessionStorage.getItem('idUsuario');
const btnPagar = document.querySelector('#btn-pagar');
let precioGeneral = 0;

const totalEntradas = document.querySelector('#total-entradas');

let llenarCarrito = async () => {

    let usuario = await buscarUsuarioCorreo();

    let listaEventos = await listarEventos();

    let eventosUsuario = usuario.usuario.entradas;

    //console.log(eventosUsuario);

    if (eventosUsuario.length == 0) {
        let titulo = document.createElement('h2');
        titulo.setAttribute('id', 'titulo-sin-entrada');
        titulo.innerHTML = 'No tienes ninguna entrada en tu carrito';
        contenedorEntrada.appendChild(titulo);
        btnPagar.classList.add('ocultar');
    } else {

        for (let i in eventosUsuario) {
            //console.log(eventosUsuario[i]['idEvento'])

            for (let j in listaEventos) {
                //console.log(eventosUsuario[i]);
                if (eventosUsuario[i]['idEvento'] == listaEventos[j]['_id'] && eventosUsuario[i]['compradas'] == false) {

                    let impuestosLista = await listarImpuestosCarrito();

                    //console.log(impuestosLista);

                    let impuestosEvento = listaEventos[j].impuestos;
                    //console.log(impuestosEvento);

                    let impuestosPagar = [];
                    let impuestosNombres = [];

                    

                    for (let x in impuestosLista) {
                        //console.log(impuestosLista[x]['nombre']);

                        for (let y in impuestosEvento) {
                            //console.log(impuestosEvento[y]['nombreImpuesto']);

                            if (impuestosLista[x]['nombre'] == impuestosEvento[y]['nombreImpuesto']) {
                                //console.log('<-- Coinciden');
                                // console.log(impuestosLista[x]['nombre']);
                                // console.log(impuestosLista[x]['porcentaje']);
                                impuestosNombres[y] = impuestosLista[x]['nombre'];
                                impuestosPagar[y] = impuestosLista[x]['porcentaje'];
                            }

                        }

                    }

                    let descuentosEvento = listaEventos[j].descuentos;
                    //console.log(descuentosEvento);

                    let descuentos = [];

                    for (let i in descuentosEvento) {
                        descuentos[i] = (descuentosEvento[i]['porcentajeDescuento']) / 100;
                        //console.log(descuentos[i]);
                    }





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
                    tituloFecha.innerHTML = 'Fecha: ' + fechaEvento;

                    divInfoEntrada.appendChild(tituloDivInfo);
                    divInfoEntrada.appendChild(numEntradas);
                    divInfoEntrada.appendChild(tituloFecha);

                    let divInfoPago = document.createElement('div');
                    let tituloInfoPago = document.createElement('h2');
                    tituloInfoPago.innerHTML = 'Precio a pagar';

                    let infoPrecio = document.createElement('h3');
                    let precio = parseInt(precioEntrada);
                    let entradas = parseInt(numeroEntradas);

                    let precioFinal;

                    let precioX = precio * entradas;

                    let descuento = 0;
                    for (let i in descuentos) {
                        //console.log(descuentos[i]);
                        descuento = descuento + descuentos[i];
                    }

                    let descuentoDecimales = descuento.toFixed(3);

                   // console.log(descuentoDecimales);

                    precioX = precioX - (precioX * descuentoDecimales);
                    //console.log(precioX);


                    let impuesto = 0;
                    for(let i in impuestosPagar){
                        impuesto = impuesto + impuestosPagar[i];
                    }

                    //console.log(impuesto);

                    precioFinal = precioX + (precioX * impuesto);

                    

                    infoPrecio.innerHTML = '₡' + (numeroComas(precioFinal));

                    parseInt(precioGeneral);
                    precioGeneral = precioGeneral + precioFinal;

                    console.log(precioGeneral);


                    
                    
                    let botonEliminar = document.createElement('button');
                    botonEliminar.setAttribute('id', 'btn-eliminar');
                    botonEliminar.innerHTML = 'Eliminar entrada'

                    let impuestosIncluidos = document.createElement('h6');
                    impuestosIncluidos.innerHTML = 'Incluye impuestos y descuentos';

                    divInfoPago.appendChild(tituloInfoPago);
                    divInfoPago.appendChild(impuestosIncluidos);

                    // for(let x in impuestosNombres) {
                    //     let impuesto = document.createElement('h6');
                    //     impuesto.innerHTML = impuestosNombres[x] +'-'; 
                    //     divInfoPago.appendChild(impuesto);
                    // }

                    divInfoPago.appendChild(infoPrecio);
                    divInfoPago.appendChild(botonEliminar);

                    let entradaContainer = document.createElement('div');
                    entradaContainer.setAttribute('class', 'entrada-container');

                    entradaContainer.appendChild(divInfoEvento);
                    entradaContainer.appendChild(divInfoEntrada);
                    entradaContainer.appendChild(divInfoPago);

                    contenedorEntrada.appendChild(entradaContainer);

                    //console.log(eventosUsuario[i]['_id']);

                    let idEntrada = eventosUsuario[i]['_id'];

                    botonEliminar.addEventListener('click', async function (e) {
                        e.preventDefault();

                        let resultado = await eliminarEntrada(userID, idEntrada);

                        if (resultado.resultado) {
                            Swal.fire({
                                icon: 'success',
                                title: 'La entrada ha sido eliminada',
                                confirmButtonText: 'Entendido',
                                onClose: function () {
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
        let precio = numeroComas(precioGeneral)
        totalEntradas.innerHTML = 'Total a pagar: ₡' + precio;
        btnPagar.dataset.precio = precio;

    }

}

llenarCarrito();

let numeroComas = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

btnPagar.addEventListener('click', function(e) {
    e.preventDefault();

    let precio = btnPagar.dataset.precio;

    console.log(precio);

})
