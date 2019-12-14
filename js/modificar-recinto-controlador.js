'use strict';

let idRecinto = sessionStorage.getItem('idRecinto');

const imagen = document.querySelector('#imagePreview');
const inputEncargado = document.querySelector('#txt-encargado');
const inputRecinto = document.querySelector('#txt-nombreRecinto');
const inputCapacidad = document.querySelector('#txt-capacidad');
const inputCapacidadEspeciales = document.querySelector('#txt-capacidadEspeciales');
const inputProvincia = document.querySelector('#txt-provincia');
const inputDireccion = document.querySelector('#txt-direccion');
const inputLatitud = document.querySelector('#latitud');
const inputLongitud = document.querySelector('#longitud');
const btnModificar = document.querySelector('#btn-modificar');


let validar = async () => {
    let error = false;

    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    let infoRecinto = await buscarRecinto(idRecinto);
    let capacidad = infoRecinto.recinto.capacidad;
    let capacidadEspeciales = infoRecinto.recinto.capacidadDiscapacitados;

    if (inputEncargado.value != 0) {
        
        if (revisar_correo.test(inputEncargado.value) == false) {
            
            error = true;
            inputEncargado.classList.add('error');
        } else {
            inputEncargado.classList.remove('error');
        }
    }

    if (inputCapacidad.value != 0) {
        let capacidadInput = parseInt(inputCapacidad.value);
        let capacidadDiscapacitados = parseInt(inputCapacidadEspeciales.value);
        if (inputCapacidad.value < inputCapacidadEspeciales.value) {
            
            error = true;
            inputCapacidad.classList.add('error');
        } else if(inputCapacidad.value < capacidadEspeciales && inputCapacidadEspeciales.value == 0){
            error = true;
            inputCapacidad.classList.add('error');
        } else {
            inputCapacidad.classList.remove('error');
        }
    }

    if (inputCapacidadEspeciales.value != 0) {
       
        let capacidadInput = parseInt(inputCapacidad.value);
        let capacidadDiscapacitados = parseInt(inputCapacidadEspeciales.value);

        if (capacidadDiscapacitados > capacidadInput) {
           
            error = true;
            inputCapacidadEspeciales.classList.add('error');
        } else if (capacidadDiscapacitados > capacidad && inputCapacidad.value == 0) {
            
            error = true;
            inputCapacidadEspeciales.classList.add('error');
        } else {
            inputCapacidadEspeciales.classList.remove('error');
        }

    }
    
    return error;
}


let llenarPerfil = async () => {
    let recinto = await buscarRecinto(idRecinto);

    let imagenSource = recinto.recinto.imagen;
    imagen.src = `${imagenSource}`;
    

    let encargado = recinto.recinto.correoEncargado;
    inputEncargado.setAttribute('placeholder', `${encargado}`);

    let nombreRecinto = recinto.recinto.nombreRecinto;
    inputRecinto.setAttribute('placeholder', `${nombreRecinto}`);

    let capacidad = recinto.recinto.capacidad;
    inputCapacidad.setAttribute('placeholder', `${capacidad}`);

    let asientosDiscapacitados = recinto.recinto.capacidadDiscapacitados;
    inputCapacidadEspeciales.setAttribute('placeholder', `${asientosDiscapacitados}`);

    let provincia = recinto.recinto.provincia;
    inputProvincia.setAttribute('placeholder', `${provincia}`);

    let direccion = recinto.recinto.direccion;
    inputDireccion.setAttribute('placeholder', `${direccion}`);

    let latitud = recinto.recinto.latitud;
    inputLatitud.setAttribute('placeholder',`${latitud}`);

    let longitud = recinto.recinto.longitud;
    inputLongitud.setAttribute('placeholder',`${longitud}`);

    initMap(latitud, longitud);

}

llenarPerfil();

let obtenerDatos = async () => {
    let imagenCloudinary = imagen.src;
    

    let encargado = inputEncargado.value;
    let recinto = inputRecinto.value;
    let capacidad = inputCapacidad.value;
    let capacidadEspeciales = inputCapacidadEspeciales.value;
    let provincia = inputProvincia.value;
    let direccion = inputDireccion.value;
    let latitud = inputLatitud.value;
    let longitud = inputLongitud.value;

     


    let errorValidacion = await validar();

    if (errorValidacion) {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        })

    } else {
         
        let error = await modificarRecinto(idRecinto, imagenCloudinary, encargado, recinto, capacidad, capacidadEspeciales, provincia, direccion, latitud, longitud);


        if (error.resultado == false) {
            Swal.fire({
                icon: 'warning',
                title: 'Algunos campos son incorrectos',
                text: 'Por favor inténtelo de nuevo',
                confirmButtonText: 'Entendido'
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados con éxito',
                text: 'El recinto ha sido modificado',
                confirmButtonText: "Entendido",
                onClose: function () {
                    location.href = 'perfil-encargado.html';
                }
            });
        }


    }

}

btnModificar.addEventListener('click', obtenerDatos);