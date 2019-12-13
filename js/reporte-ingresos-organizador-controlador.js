"use strict"

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaEventos;
const inputFiltro = document.querySelector('#txt-filtro');
const inputTotalIngresos = document.querySelector("#txt-totalIngresos");

const btnMes = document.querySelector("#btn-mes");

const idUsuario = sessionStorage.getItem("idUsuario");

let llenarTabla = async() => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    let totalIngreso = 0;
    console.log(totalIngreso);


    for (let i = 0; i < listaEventos.length; i++) {

        let idCreador = listaEventos[i]["creador"];
        if (idCreador == idUsuario) { /// CONDICIONAL PARA EL ORGANIZADOR

            let precio = parseFloat(listaEventos[i]["precioEntrada"]);

            let fechasArray = listaEventos[i]['fechas'];

            let totalAsistentes = 0;
            for (let j = 0; j < fechasArray.length; j++) {
                let fechasEvento = listaEventos[i]['fechas'][j];
                //console.log(fechasEvento);
                let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
                console.log(cantidadAsistentes);
                totalAsistentes = totalAsistentes + cantidadAsistentes;
                console.log(totalAsistentes);

            }


            let totalEvento = totalAsistentes * precio;


            let fila = tableBody.insertRow();
            //let entradas = (listaEventos[i]['entradas vendidas']);
            fila.insertCell().innerHTML = listaEventos[i]['nombre'];
            fila.insertCell().innerHTML = totalAsistentes;
            fila.insertCell().innerHTML = "₡" + precio;
            fila.insertCell().innerHTML = "₡" + totalEvento;

            totalIngreso = totalIngreso + totalEvento;
        }
        console.log(totalIngreso);
        inputTotalIngresos.innerHTML = "₡" + totalIngreso;

    }

}


let llenarTablaMes = async(mes) => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    let totalIngreso = 0;
    console.log(totalIngreso);

    for (let i = 0; i < listaEventos.length; i++) {
        let idCreador = listaEventos[i]["creador"];
        if (idCreador == idUsuario) { /// CONDICIONAL PARA EL ORGANIZADOR


            let precio = parseFloat(listaEventos[i]["precioEntrada"]);

            let fechasArray = listaEventos[i]['fechas'];

            let totalAsistentes = 0;
            for (let j = 0; j < fechasArray.length; j++) {
                let fechasEvento = listaEventos[i]['fechas'][j];
                //console.log(fechasEvento);
                let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
                console.log(cantidadAsistentes);
                totalAsistentes = totalAsistentes + cantidadAsistentes;
                console.log(totalAsistentes);

            }


            let totalEvento = totalAsistentes * precio;


            let fila = tableBody.insertRow();
            //let entradas = (listaEventos[i]['entradas vendidas']);
            fila.insertCell().innerHTML = listaEventos[i]['nombre'];
            fila.insertCell().innerHTML = totalAsistentes;
            fila.insertCell().innerHTML = "₡" + precio;
            fila.insertCell().innerHTML = "₡" + totalEvento;

            totalIngreso = totalIngreso + totalEvento;
        }
        console.log(totalIngreso);
        inputTotalIngresos.innerHTML = "₡" + totalIngreso;
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