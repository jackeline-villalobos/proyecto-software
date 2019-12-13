"use strict"

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaEventos;

const inputTotalIngresos = document.querySelector("#txt-totalIngresos");

const btnMes = document.querySelector("#btn-mes");


let llenarTabla = async() => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    for (let i = 0; i < listaEventos.length; i++) {

        let fechasArray = listaEventos[i]['fechas'];

        let totalAsistentes = 0;
        let entradasVendidas = 0;
        let entradasVendidasTotales = 0;

        for (let j = 0; j < fechasArray.length; j++) {
            let fechasEvento = listaEventos[i]['fechas'][j]["fecha"];

            let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
            let entradasTotales = parseFloat(listaEventos[i]["fechas"][j]["entradasTotales"]);

            entradasVendidas = entradasTotales - cantidadAsistentes;
            entradasVendidasTotales = entradasVendidasTotales + entradasVendidas;


            let fila = tableBody.insertRow();
            //let entradas = (listaEventos[i]['entradas vendidas']);
            fila.insertCell().innerHTML = listaEventos[i]['nombre'];
            fila.insertCell().innerHTML = listaEventos[i]["fechas"][j]["fecha"];
            console.log(fechasEvento);
            fila.insertCell().innerHTML = entradasVendidasTotales;
            fila.insertCell().innerHTML = listaEventos[i]["estado"];
        }
    }
}

let llenarTablaMes = async(mes) => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    for (let i = 0; i < listaEventos.length; i++) {

        let fechasArray = listaEventos[i]['fechas'];

        let totalAsistentes = 0;
        let entradasVendidas = 0;
        let entradasVendidasTotales = 0;

        for (let j = 0; j < fechasArray.length; j++) {
            let mesEvento = fechasArray[j]["fecha"].substr(5, 2);
            console.log(mesEvento);


            let fechasEvento = listaEventos[i]['fechas'][j]["fecha"];

            let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
            let entradasTotales = parseFloat(listaEventos[i]["fechas"][j]["entradasTotales"]);

            entradasVendidas = entradasTotales - cantidadAsistentes;
            entradasVendidasTotales = entradasVendidasTotales + entradasVendidas;

            let fila = tableBody.insertRow();
            if (mes === mesEvento) {
                //let entradas = (listaEventos[i]['entradas vendidas']);
                fila.insertCell().innerHTML = listaEventos[i]['nombre'];
                fila.insertCell().innerHTML = listaEventos[i]["fechas"][j]["fecha"];
                console.log(fechasEvento);
                fila.insertCell().innerHTML = entradasVendidasTotales;
                fila.insertCell().innerHTML = listaEventos[i]["estado"];
            }
        }
    }
}

btnMes.addEventListener("click", function() {
    let mes = document.getElementById('txt-filtro').value;
    console.log("MES DEL INPUT : " + mes);
    if (mes == "todos") {
        llenarTabla();
    } else {
        tableBody.innerHTML = '';
        llenarTablaMes(mes);
    }

});

llenarTabla();