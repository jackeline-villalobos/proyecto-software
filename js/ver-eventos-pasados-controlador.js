'use strict';

const contenedor = document.querySelector('#contenedorCards');
// const inputFiltro = document.querySelector('#txt-filtro');


let mostrarCards = async () => {
    // let filtro = inputFiltro.value.toLowerCase();
    let listaEventos = await listarEventos();

    //console.log(listaEventos)

    contenedor.innerHTML = '';

    for (let i = 0; i < listaEventos.length; i++) {

        let nombre = listaEventos[i]['nombre'].toLowerCase();
        let imagen = listaEventos[i]['imagen'];

        let fechaHoy = new Date();


        for (let j = 0; j < listaEventos[i]['fechas'].length; j++) {

            let fechaEvento = new Date(listaEventos[i]['fechas'][j]['fecha'] + " "+ listaEventos[i]['fechas'][j]['hora']);
            // let fechaDiaEvento = String(new Date(listaEventos[i]['fechas'][j]['fecha']).getDate() + 1);
            // let diaFechaEvento = String(fechaEvento.getDate() + 1).padStart(2, '0');
            // let fechaDiaEvento = new Date(getDate(listaEventos[i]['fechas'][j]['fecha'] + 1));
            // let horaEvento = fechaHoy.getUTCHours(listaEventos[i]['fechas'][j]['hora']);
            // let horaEventos = fechaHoy.getTime(listaEventos[i]['fechas'][j]['hora']);
            // let ahora = Date.now();
            // let horaActual = fechaHoy.getTime();

            let annoActual = fechaHoy.getFullYear();
            let mesActual = String(fechaHoy.getMonth() + 1);
            let fechaDiaActual = String(fechaHoy.getDate());
            let horaActual = String(fechaHoy.getHours());
            let minutosActuales = String(fechaHoy.getMinutes());
            let segundosActuales = String(fechaHoy.getSeconds());

            let annoEvento = fechaEvento.getFullYear();
            let mesEvento = String(fechaEvento.getMonth() + 1);
            let fechaDiaEvento = String(fechaEvento.getDate());
            let horaEvento = String(fechaEvento.getHours());
            let minutosEvento = String(fechaEvento.getMinutes());
            let segundosEvento = String(fechaEvento.getSeconds());

            console.log("Fecha dividida actual: " + annoActual, mesActual, fechaDiaActual, "Hora dividida actual: " + horaActual, minutosActuales, segundosActuales);
            console.log("Fecha dividida del evento "  + nombre + ": "+ annoEvento, mesEvento, fechaDiaEvento, "Hora dividida del evento: " + horaEvento, minutosEvento, segundosEvento);

            console.log("Fecha y hora de hoy: " + fechaHoy);
            console.log("Fecha y hora del evento " + nombre + ": ", fechaEvento);


            // ]Date.now(padStart(2, '0'));


            // console.log('Nombre del evento: ' + nombre + 
            //             ' Fecha del evento: ' + fechaEvento + 
            //             ' Hora del evento: ' + horaEvento + 
            //             ' Fecha de hoy: ' + fechaHoy);

            // console.log('Fecha de hoy: ' + fechaHoy);

            // console.log('Fecha del evento: ' + fechasEventos)


            // console.log(horaActual);

            // console.log(fechaEvento);


            // console.log(nombre, fechaDiaEvento);

            // console.log("Año actual: " + annoActual, "Mes actual: " + mesActual, "Número de día actual: " + fechaDiaActual, "Hora actual (manecilla horario): " + horaActual, "Minutos actuales: " + minutosActuales, "Segundos actuales: " + segundosActuales);
            // console.log("Año del evento: " + annoEvento, "Mes del evento: " + mesEvento, "Número de día del avento: " + fechaDiaEvento, "Hora del evento (manecilla horario): " + horaEvento, "Minutos del evento: " + minutosEvento, "Segundos del evento: " + segundosEvento);


            



            // if (annoEvento >= annoActual && 
            //     mesEvento >= mesActual && 
            //     fechaDiaEvento >= fechaDiaActual && 
            //     horaEvento >= horaActual && 
            //     minutosEvento >= minutosActuales &&
            //     segundosEvento >= segundosActuales) {

            // }

            // fechaEvento.includes(fechaDiaEvento);

            if (fechaEvento < fechaHoy ) {
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                let header = document.createElement('header');
                header.style.backgroundImage = 'url, (`${imagen}`)';
                let img = document.createElement('img');
                img.src = `${imagen}`;

                let nombre = document.createElement('h2');
                nombre.innerText = listaEventos[i]['nombre'];

                let fecha = document.createElement('h3');
                // for (let j = 0; j < listaEventos[i]['fechas'].length; j++) {


                // fecha.innerText = 'Fecha: ' + fechaDiaEvento + "-" + mesEvento + "-" + annoEvento;

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

            // if (annoEvento >= annoActual) {
            //     if (mesEvento >= mesActual) {
            //         if (fechaDiaEvento >= fechaDiaActual) {
            //             if (horaEvento >= horaActual) {
            //                 if (minutosEvento >= minutosActuales) {
            //                     if (segundosEvento >= segundosActuales) {
            //                         let cardDiv = document.createElement('div');
            //                         cardDiv.classList.add('card');

            //                         let header = document.createElement('header');
            //                         header.style.backgroundImage = 'url, (`${imagen}`)';
            //                         let img = document.createElement('img');
            //                         img.src = `${imagen}`;

            //                         let nombre = document.createElement('h2');
            //                         nombre.innerText = listaEventos[i]['nombre'];

            //                         let fecha = document.createElement('h3');
            //                         // for (let j = 0; j < listaEventos[i]['fechas'].length; j++) {
            //                         fecha.innerText = 'Fechas: ' + listaEventos[i]['fechas'][j]['fecha'];
            //                         // }


            //                         let lugar = document.createElement('h4');
            //                         lugar.innerText = 'Lugar: ' + listaEventos[i]['lugar'];

            //                         let precio = document.createElement('h4');
            //                         precio.innerText = 'Precio: ' + listaEventos[i]['precioEntrada'];

            //                         let boton = document.createElement('button');
            //                         boton.classList.add('btn-mas');
            //                         boton.innerHTML = 'Ver más';
            //                         boton.dataset._id = listaEventos[i]['_id'];

            //                         boton.addEventListener('click', function () {
            //                             localStorage.setItem('idEvento', this.dataset._id);
            //                             window.location.href = 'perfil-evento.html';
            //                         });

            //                         contenedor.appendChild(cardDiv);
            //                         cardDiv.appendChild(header);
            //                         header.appendChild(img);
            //                         cardDiv.appendChild(nombre);
            //                         cardDiv.appendChild(fecha);
            //                         cardDiv.appendChild(lugar);
            //                         cardDiv.appendChild(precio);
            //                         cardDiv.appendChild(boton);
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }





        }
    };
};
mostrarCards();
// inputFiltro.addEventListener('keyup', mostrarCards);
