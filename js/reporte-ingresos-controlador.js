"use strict"

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaEventos;
const inputFiltro = document.querySelector('#txt-filtro');
const inputTotalIngresos = document.querySelector("#txt-totalIngresos");



let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    listaEventos = await listarEventos();
    //console.log(listaEventos);

    tableBody.innerHTML = '';

    let totalIngreso;

    for (let i = 0; i < listaEventos.length; i++) {
        //let evento = listaEventos[i]['evento'].toLowerCase();  // Esta vara no lo ocupo

        let precio = parseFloat(listaEventos[i]["precioEntrada"]);

       // console.log(listaEventos);

        let fechasArray = listaEventos[i]['fechas'];
        // console.log(fechasArray);
        for (let j = 0; j < fechasArray.length; j++) {
            let fechasEvento = listaEventos[i]['fechas'][j];
            //console.log(fechasEvento);
            let cantidadAsistentes = listaEventos[i]['fechas'][j]['cantidadAsistentes'];
            console.log(cantidadAsistentes);
            // let totalAsistentes = totalAsistentes + cantidadAsistentes;


        }

        //let cantidadAsistentes = parseFloat(listaEventos[i]["cantidadAsistentes"]); // Esto lo pase al for loop j 
        //let totalEvento = totalAsistentes * listaEventos[i]["precioEntradas"];

        let fila = tableBody.insertRow();
        //let entradas = (listaEventos[i]['entradas vendidas']);
        fila.insertCell().innerHTML = listaEventos[i]['nombre'];
        //fila.insertCell().innerHTML = totalAsistentes;
        fila.insertCell().innerHTML = precio;
        //fila.insertCell().innerHTML = totalEvento;

        //totalIngreso = totalIngreso + totalEvento;
    }
    //inputTotalIngresos.innerHTML = totalIngreso;

}

llenarTabla();