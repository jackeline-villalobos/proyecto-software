'use strict';

/*
Nombre
Direccion exacta
Ubicacion en mapa
Canton
Distrito
Capacidad (cantidad asientos tradicionales + discapacidados)

*/


const input_nombreRecinto = document.querySelector('#txt-nombreRecinto');
const input_capacidad = document.querySelector('#txt-capacidad');
const input_capacidadDiscapacitado = document.querySelector('#txt-capacidadDiscapacitado');
const input_correoEncargado = document.querySelector("#correo-encargado");

const input_direccion = document.querySelector('#direcciones');
const input_provincia = document.querySelector('#provincias');
const input_canton = document.querySelector('#cantones');
const input_distrito = document.querySelector('#distritos');
const input_imagen = document.querySelector('#imagePreview');

let input_latitud = document.querySelector("#latitud");
let input_longitud = document.querySelector("#longitud");

const btnCoordenadas = document.querySelector("#coordenadas");

const btn_guardar = document.querySelector('#btn-registrar');


// Tavo trying to check the email on the database.
let enviarCorreoEncargado = async() => {

    let listaEncargados = await listarEncargados();
    let verificarEncargado = false;

    for (let i = 0; i < listarEncargados.length; i++) {

        let correoEncargado = listaEncargados[i]['correoElectronico'].lowerCase;

        if (input_correoEncargado.value.lowerCase === correoEncargado) {
            agregarRecinto(nombreRecinto);
        } else {

        }
    };

}

let validar = () => {
    let error = false;
    let errorCodigo = 0;

    let z1 = /^[0-9]*$/; // 0 o mas
    let z2 = /^[0-9]+$/; // 1 o mas

    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;


    let vCapacidad = parseInt(input_capacidad.value);
    let vCapacidadDiscapacitado = parseInt(input_capacidadDiscapacitado.value);


    // Validar la capacidad
    if (vCapacidadDiscapacitado > vCapacidad) {
        error = true;
        input_capacidadDiscapacitado.classList.add("error");
        errorCodigo = 2;
    } else {
        input_capacidadDiscapacitado.classList.remove("error");
    }

    if (input_capacidad.value <= 0) {
        error = true;
        input_capacidad.classList.add("error");
    } else {
        input_capacidad.classList.remove("error");
    }

    // Validar otros campos
    if (input_nombreRecinto.value == "" || input_nombreRecinto.value == " " || input_nombreRecinto.value == 0) {
        error = true;
        input_nombreRecinto.classList.add("error");
        errorCodigo = 1;
    } else {
        input_nombreRecinto.classList.remove("error");
    };

    if (input_capacidad.value == "" || input_capacidad.value == " " || input_capacidad.value == 0) {
        error = true;
        input_capacidad.classList.add("error");
        errorCodigo = 2;
    } else {
        input_capacidad.classList.remove("error");
    };

    if (!z2.test(input_capacidad.value)) {
        error = true;
        input_capacidad.classList.add("error");
        errorCodigo = 2;

    } else {
        input_capacidad.classList.remove("error");
    }

    if (!z1.test(input_capacidadDiscapacitado.value)) {
        error = true;
        input_capacidadDiscapacitado.classList.add("error");
        errorCodigo = 2;
    } else {
        input_capacidadDiscapacitado.classList.remove("error");
    }

    if (revisar_correo.test(input_correoEncargado.value) == false) {
        error = true;
        input_correoEncargado.classList.add('error');
    } else {
        input_correoEncargado.classList.remove('error');
    }

    if (input_direccion.value == "" || input_direccion.value == " " || input_direccion.value == 0) {
        error = true;
        input_direccion.classList.add("error");
        errorCodigo = 5;
    } else {
        input_direccion.classList.remove("error");
    };

    if (input_provincia.value == "" || input_provincia.value == " " || input_provincia.value == 0) {
        error = true;
        input_provincia.classList.add("error");
        errorCodigo = 6;
    } else {
        input_provincia.classList.remove("error");
    };

    if (input_canton.value == "" || input_canton.value == " " || input_canton.value == 0) {
        error = true;
        input_canton.classList.add("error");
        errorCodigo = 7;
    } else {
        input_canton.classList.remove("error");
    };

    if (input_distrito.value == "" || input_distrito.value == " " || input_distrito.value == 0) {
        error = true;
        input_distrito.classList.add("error");
        errorCodigo = 8;
    } else {
        input_distrito.classList.remove("error");
    };

    if (input_imagen == 0) {
        error = true;
        input_imagen.classList.add("error");

    } else {
        input_imagen.classList.remove("error");
    }

    if (input_latitud.value == 0) {
        error = true;
        input_latitud.classList.add("error");
    } else {
        //input_latitud.classList.remove("error");
    }

    if (input_longitud.value == 0) {
        error = true;
        input_longitud.classList.add("error");
    } else {
        //input_longitud.classList.remove("error");
    }

    return error;



};


let resetForm = () => {
    input_nombreRecinto.value = '';
    input_capacidad.value = '';
    input_capacidadDiscapacitado.value = "";
    input_correoEncargado.value = "";

    input_direccion.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
    input_latitud = "";
    input_longitud = "";
    //input_imagen.src = "imagenes/registrar-evento/outlined_placeholder-512.png";
};
let obtener_datos = async() => {

    let nombreRecinto = input_nombreRecinto.value;
    let capacidad = input_capacidad.value;
    let capacidadDiscapacitado = input_capacidadDiscapacitado.value;
    let correoEncargado = input_correoEncargado.value;

    let direccion = input_direccion.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let imagen = imagePreview.src;

    let latitud = input_latitud.value;
    let longitud = input_longitud.value;
    var locacion;
    console.log(latitud, longitud);



    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos de los campos no se ingresaron correctamente.',
            text: 'Por favor, revise los campos en rojo.',
            confirmButtonText: 'Entendido'
        })


    } else {

        let errorCorreo = await verificarCorreoEncargado(correoEncargado);

        console.log(errorCorreo);

        if (!errorCorreo) {
            Swal.fire({
                icon: 'warning',
                title: 'El correo ingresado ya existe como usuario',
                confirmButtonText: 'Entendido'
            });

        } else {
            let error = await registrar_recinto(nombreRecinto, capacidad, capacidadDiscapacitado, correoEncargado, direccion, provincia, canton, distrito, imagen, latitud, longitud);

            if (error.resultado == false) {
                Swal.fire({
                    icon: 'warning',
                    title: 'El recinto no ha podido registrarse correctamente',
                    confirmButtonText: 'Entendido'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro realizado con éxito',
                    text: 'El recinto ha sido almacenado',
                    confirmButtonText: 'Entendido',
                    costumClass: 'modal',
                    onClose: function() {
                        location.href = 'perfil-administrador.html';
                    }
                });

                resetForm();
            }

        }

    }
};

btn_guardar.addEventListener('click', obtener_datos);
btnCoordenadas.addEventListener('click', ubicarMap);


/*
google.maps.event.addListener(map, "click", function (e) {

    placeMarkerAndPanTo(e.latLng, map);
});
*/