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

        let imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'gifCarrito');


        let img = document.createElement('img');
        // img.setAttribute('class', 'gifCarrito');
        img.setAttribute('src', 'https://cdn.dribbble.com/users/1914549/screenshots/5374040/day24.gif');
        imgContainer.appendChild(img);
        contenedorEntrada.appendChild(imgContainer);

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
                    for (let i in impuestosPagar) {
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

btnPagar.addEventListener('click', async function (e) {
    e.preventDefault();

    let precio = btnPagar.dataset.precio;

    let usuario = await buscarUsuarioCorreo();
    console.log(usuario.usuario.tarjeta);

    let tarjeta = usuario.usuario.tarjeta;

    let entradas = usuario.usuario.entradas;
    //console.log(entradas);

    let tarjetas = new Array();

    for (let i = 0; i < tarjeta.length; i++) {
        //tarjetas['marca'] = tarjeta[i]['marca'];
        tarjetas[i] = new Object(tarjeta[i]['marca'] + ' ' + ocultarTarjeta(tarjeta[i]['numero']));
    }

    let listaEventos = await listarEventos();
    console.log(listaEventos)


    // const alert = await Swal.fire({
    //     title: 'Selecciona una tarjeta',
    //     input: 'select',
    //     inputOptions: tarjetas,
    //     inputPlaceholder: 'Tarjetas',
    //     showCancelButton: true,
    //     cancelButtonText: 'Cancelar',
    //     confirmButtonText: 'Pagar',

    // })

    Swal.fire({
        title: 'Seleccione una tarjeta',
        input: 'select',
        inputOptions: tarjetas,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    }).then(async (resultadoTarjeta) => {
        if (resultadoTarjeta.value == '') {
            Swal.fire({
                icon: 'warning',
                title: 'Debe seleccionar una tarjeta',
                confirmButtonText: 'Entendido'
            });
        } else if (resultadoTarjeta.dismiss == 'cancel') {

        } else {
            console.log(resultadoTarjeta);
            let resultado;
            let res;
            let fecha = new Date();
            let fechaHoy = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();
            console.log(fechaHoy);
            for (let i in entradas) {
                let idEntrada = entradas[i]['_id'];
                let idEvento = entradas[i]['idEvento'];
                let idFecha = entradas[i]['idFecha'];

                let entradasUsuario = entradas[i]['numeroEntradas'];

                let nombreEvento;

                for (let x in listaEventos) {
                    if (listaEventos[x]['_id'] == idEvento) {
                        nombreEvento = listaEventos[x]['nombre'];
                    }
                }

                console.log(nombreEvento);

                res = await eliminarEntrada(userID, idEntrada);

                resultado = await comprarEntrada(idEvento, idFecha, entradasUsuario);

                let entradaID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                let resCorreo = await agregarNotificacion(userID, fechaHoy, nombreEvento, entradaID);

                console.log(res);
                console.log(resultado);
                console.log(resCorreo);
            }

            if (res.resultado && resultado.resultado) {
                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada con éxito',
                    text: 'Las entradas llegarán a tu correo',
                    confirmButtonText: 'Entendido',
                    onClose: function () {
                        location.reload();
                    }
                })
            }

        }
    });

})

let ocultarTarjeta = (numTarjeta) => {

    let oculto = numTarjeta.replace(/.(?=.{4,}$)/g, '*');
    return oculto;
}



