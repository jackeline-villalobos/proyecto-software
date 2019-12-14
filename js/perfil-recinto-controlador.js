'use strict';

let idRecinto = sessionStorage.getItem('idRecinto');

const imagen = document.querySelector('#imagen');
const h2 = document.querySelector('#h2-title');
const h3 = document.querySelector('#h3-title');
const h4 = document.querySelector('#h4-title');
const h5 = document.querySelector('#h5-title');
const h6 = document.querySelector('#h6-title');
const parrafo = document.querySelector('#parrafo');
const verRecinto = document.querySelector('#ver-eventos');


const btnModificar = document.querySelector('#btn-modificar');
const grado = sessionStorage.getItem('gradoUsuario');

const btnActivar = document.querySelector('#btn-activar');
const btnDesactivar = document.querySelector('#btn-desactivar');

if (grado != 2) {
    btnModificar.classList.add('ocultar');
}

let mostrarButtons = (estado) => {

    if (grado == 1) {
        if (estado == 'activo') {
            btnActivar.classList.add('ocultar');
        } else {
            btnDesactivar.classList.add('ocultar');
        }

    } else {
        btnActivar.classList.add('ocultar');
        btnDesactivar.classList.add('ocultar');
    }



}


let llenarPerfil = async () => {
    let recinto = await buscarRecinto(idRecinto);
    console.log(recinto);

    let estado = recinto.recinto.estado;

    mostrarButtons(estado);

    let imagenSource = recinto.recinto.imagen;
    imagen.src = `${imagenSource}`;

    let encargado = recinto.recinto.correoEncargado;
    h2.innerHTML = 'Encargado: ' + encargado;

    let nombreRecinto = recinto.recinto.nombreRecinto;
    h3.innerHTML = 'Nombre de recinto: ' + nombreRecinto;

    let capacidad = recinto.recinto.capacidad;
    h4.innerHTML = 'Capacidad de recinto: ' + capacidad;

    let asientosDiscapacitados = recinto.recinto.capacidadDiscapacitados;
    h5.innerHTML = 'Asientos especiales: ' + asientosDiscapacitados;

    let provincia = recinto.recinto.provincia;
    h6.innerHTML = 'Provincia: ' + provincia;

    let direccion = recinto.recinto.direccion;
    parrafo.innerHTML = 'Dirección de recinto: ' + direccion;

    let latitud = recinto.recinto.latitud;
    console.log(latitud);

    let longitud = recinto.recinto.longitud;
    console.log(longitud);

    initMap(latitud, longitud);

    verRecinto.addEventListener('click', function(e){
        

        let recintoName = recinto.recinto.nombreRecinto;

        sessionStorage.setItem('nombreRecinto', recintoName);

    });

}

llenarPerfil();

btnActivar.addEventListener('click', async function () {
    let estado = 'activo';

    let resultado = await modificarEstado(idRecinto, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El recinto ha sido activado',
            confirmButtonText: "Entendido",
            onClose: function () {
                location.href = 'listar-recintos-card.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El recinto no se ha podido activar',
            confirmButtonText: "Entendido"
        });

    }

});

btnDesactivar.addEventListener('click', async function () {
    let estado = 'inactivo';

    let resultado = await modificarEstado(idRecinto, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Desactivado con éxito',
            text: 'El recinto ha sido activado',
            confirmButtonText: "Entendido",
            onClose: function () {
                location.href = 'listar-recintos-inactivos-card.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El recinto no se ha podido activar',
            confirmButtonText: "Entendido"
        });

    }
});