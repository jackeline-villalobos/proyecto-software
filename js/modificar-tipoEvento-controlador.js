'use strict';

const inputNombre = document.querySelector('#txt-nombretipoEvento');
const btnGuardar = document.querySelector('#btn-guardar');
const idtipoEvento = sessionStorage.getItem('tipoEvento');
const nombretipoEvento = sessionStorage.getItem('nombretipoEvento');

const inputActivo = document.querySelector("txt-activartipoEvento");
const estadotipoEvento = sessionStorage.getItem("estado");



let llenarForm = () => {

    inputNombre.setAttribute('placeholder', `${nombretipoEvento}`);
    inputActivo.setAttribute(`${estadotipoEvento}`)


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
                    sessionStorage.removeItem("estado")
                    location.href = 'perfil-administrador.html';
                }
            })
        }

        inputNombre.value = '';
    }

}

llenarForm();
btnGuardar.addEventListener('click', obtenerDatos);