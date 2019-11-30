'use strict';

const inputNombre = document.querySelector('#txt-tipoEvento');

const btnGuardar = document.querySelector('#btn-guardar');

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

        let error = await registrartipoEvento(nombre);


        if (error.resultado == false) {

            Swal.fire({
                icon: 'warning',
                title: 'El tipo de evento no se pudo registrar correctamente',
                confirmButtonText: 'Entendido'
            })

        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'El tipo de evento ha sido almacenado',
                confirmButtonText: "Entendido",
                onClose: function() {
                    location.href = 'perfil-administrador.html';
                }
            })
        }


        inputNombre.value = '';

    }

}


btnGuardar.addEventListener('click', obtenerDatos);