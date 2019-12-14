'use strict';

const inputNombre = document.querySelector('#txt-nombretipoEvento');
const btnGuardar = document.querySelector('#btn-guardar');
const idtipoEvento = sessionStorage.getItem('tipoEvento');
const nombretipoEvento = sessionStorage.getItem('nombretipoEvento');
const estadotipoEvento = sessionStorage.getItem("estadotipoEvento");



const btnActivar = document.querySelector('#btn-activar');
const btnDesactivar = document.querySelector('#btn-desactivar');

const btnEliminar = document.querySelector('#btn-eliminar');


let llenarForm = () => {

    inputNombre.setAttribute('placeholder', `${nombretipoEvento}`);


    if (estadotipoEvento == "activo") {
        btnActivar.classList.add("btn-estado")

        // btnActivar.disabled = true;

    }
    if (estadotipoEvento == "inactivo") {
        btnDesactivar.classList.add("btn-estado")
    }

}


let validar = () => {
    let error = false;

    if (inputNombre.value == 0) {

        error = true;
        inputNombre.classList.add('error');

    } else {

        inputNombre.classList.remove('error');

    }

    return error;
}




let obtenerDatos = async() => {

    let nombre = inputNombre.value.toLowerCase();

    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        })


    } else {

        let error = await modificartipoEvento(idtipoEvento, nombre, estado);

        if (error.resultado == false) {

            Swal.fire({
                icon: 'warning',
                title: 'El tipo de evento no se ha podido modificar correctamente',
                confirmButtonText: 'Entendido'
            })

        } else {
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados con éxito',
                text: 'El tipo de evento ha sido modificado',
                confirmButtonText: "Entendido",
                onClose: function() {
                    sessionStorage.removeItem('tipoEvento');
                    sessionStorage.removeItem('nombretipoEvento');
                    sessionStorage.removeItem("estadotipoEvento")
                    location.href = 'perfil-administrador.html';
                }
            })
        }

        inputNombre.value = '';
    }

}

llenarForm();
btnGuardar.addEventListener('click', obtenerDatos);


btnActivar.addEventListener('click', async function() {
    let estado = 'activo';

    let resultado = await modificarEstado(idtipoEvento, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Activado con éxito',
            text: 'El tipo de evento ha sido activado',
            confirmButtonText: "Entendido",
            onClose: function() {
                sessionStorage.removeItem('tipoEvento');
                sessionStorage.removeItem('nombretipoEvento');
                sessionStorage.removeItem("estadotipoEvento")
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El tipo de evento no se ha podido activar',
            confirmButtonText: "Entendido"
        });

    }

});

btnDesactivar.addEventListener('click', async function() {
    let estado = 'inactivo';

    let resultado = await modificarEstado(idtipoEvento, estado);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Desactivado con éxito',
            text: 'El tipo de evento ha sido desactivado',
            confirmButtonText: "Entendido",
            onClose: function() {
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El tipo de evento no se ha podido desactivar',
            confirmButtonText: "Entendido"
        });

    }
});


btnEliminar.addEventListener('click', async function(e) {

    e.preventDefault();

    let resultado = await eliminartipoEvento(idtipoEvento);

    if (resultado.resultado == true) {

        Swal.fire({
            icon: 'success',
            title: 'Eliminado con éxito',
            text: 'El tipo de evento ha sido eliminado',
            confirmButtonText: "Entendido",
            onClose: function() {
                location.href = 'perfil-administrador.html';
            }
        });

    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El tipo de evento no se ha podido eliminar',
            confirmButtonText: "Entendido"
        });

    }
});