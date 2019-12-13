"use strict"

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaEventos;

const inputTotalIngresos = document.querySelector("#txt-totalIngresos");

const btnMes = document.querySelector("#btn-mes");



let d = new Date();
let anoHoy = d.getFullYear();
let mesHoy = d.getMonth() + 1;
let diaHoy = d.getDate();

let StringHoy = anoHoy + "-" + mesHoy + "-" + diaHoy;
console.log("StringHoy: " + StringHoy);

let validarFechas = (fechasEvento) => {
    let esPasado = false;

    let anoFechasEvento = fechasEvento.substr(0, 4);
    let mesFechasEvento = fechasEvento.substr(5, 2);
    let diaFechasEvento = fechasEvento.substr(8, 2);

    var d1 = Date.parse(StringHoy);
    var d2 = Date.parse(fechasEvento);

    if (d1 > d2) {
        esPasado = true;
    }
    console.log("Validacion Fecha Evento : " + fechasEvento);
    console.log("esPasado: " + esPasado);

    return esPasado;

}


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
            console.log("Fechas Evento: " + fechasEvento);
            let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
            let entradasTotales = parseFloat(listaEventos[i]["fechas"][j]["entradasTotales"]);

            entradasVendidas = entradasTotales - cantidadAsistentes;
            entradasVendidasTotales = entradasVendidasTotales + entradasVendidas;

            if (validarFechas(fechasEvento) == true) {
                let fila = tableBody.insertRow();
                //let entradas = (listaEventos[i]['entradas vendidas']);
                fila.insertCell().innerHTML = listaEventos[i]['nombre'];
                fila.insertCell().innerHTML = listaEventos[i]["fechas"][j]["fecha"];
                console.log(fechasEvento);
                fila.insertCell().innerHTML = entradasVendidasTotales;
            }
        }
    }
}

llenarTabla();