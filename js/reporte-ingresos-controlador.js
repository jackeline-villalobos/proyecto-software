"use strict"

const tableBody = document.querySelector('#tbl-impuestos tbody');
let listaEventos;

const inputTotalIngresos = document.querySelector("#txt-totalIngresos");

const btnMes = document.querySelector("#btn-mes");




let llenarTabla = async() => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    let totalIngreso = 0;
    console.log(totalIngreso);
    for (let i = 0; i < listaEventos.length; i++) {

        let precio = parseFloat(listaEventos[i]["precioEntrada"]);

        let fechasArray = listaEventos[i]['fechas'];

        let totalAsistentes = 0;
        let entradasVendidas = 0;
        let entradasVendidasTotales = 0;
        for (let j = 0; j < fechasArray.length; j++) {
            let fechasEvento = listaEventos[i]['fechas'][j];

            let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
            let entradasTotales = parseFloat(listaEventos[i]["fechas"][j]["entradasTotales"]);

            entradasVendidas = entradasTotales - cantidadAsistentes;


            entradasVendidasTotales = entradasVendidasTotales + entradasVendidas;
        }


        let totalEvento = entradasVendidasTotales * precio;


        let fila = tableBody.insertRow();
        //let entradas = (listaEventos[i]['entradas vendidas']);
        fila.insertCell().innerHTML = listaEventos[i]['nombre'];
        fila.insertCell().innerHTML = entradasVendidasTotales;
        fila.insertCell().innerHTML = "₡" + precio;
        fila.insertCell().innerHTML = "₡" + totalEvento;

        totalIngreso = totalIngreso + totalEvento;
    }
    console.log("total ingresos: " + totalIngreso);
    inputTotalIngresos.innerHTML = "₡" + totalIngreso;

}

/*
let llenarTablaMes = async(mes) => {
    listaEventos = await listarEventos();

    tableBody.innerHTML = '';

    let totalIngreso = 0;

    for (let i = 0; i < listaEventos.length; i++) {

        let precio = parseFloat(listaEventos[i]["precioEntrada"]);

        let fechasArray = listaEventos[i]['fechas'];

        let totalAsistentes = 0;
        for (let j = 0; j < fechasArray.length; j++) {
            let mesEvento = fechasArray[j]["fecha"].substr(5, 2);
            console.log(mesEvento);
            if (mes == mesEvento) { ///CON MES SELECCIONADO
                let fechasEvento = listaEventos[i]['fechas'][j];

                let cantidadAsistentes = parseFloat(listaEventos[i]['fechas'][j]['cantidadAsistentes']);
                console.log(cantidadAsistentes);
                totalAsistentes = totalAsistentes + cantidadAsistentes;
                console.log(totalAsistentes);


            } else {
                Swal.fire({
                    title: 'No hay ingresos este mes',
                    text: 'El usuario ha sido baneado',
                    confirmButtonText: "Entendido",
                })

            }
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
}

inputTotalIngresos.innerHTML = "₡" + totalIngreso;

}


*/
llenarTabla();

btnMes.addEventListener("click", function() {
    let mes = document.getElementById('txt-filtro').value;
    console.log("mes: " + mes);

    llenarTablaMes(mes);
});