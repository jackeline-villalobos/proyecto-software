'use strict';

const inputNombre = document.querySelector('#txt-nombreImpuesto');
const inputPorcentaje = document.querySelector('#txt-porcentaje');
const btnGuardar = document.querySelector('#btn-guardar');

let validar = () => {
    let error = false;

    if (inputNombre.value == 0) {

        error = true;
        inputNombre.classList.add('error');

    } else {

        inputNombre.classList.remove('error');

    }

    if (inputPorcentaje.value <= 0) {

        error = true;
        inputPorcentaje.classList.add('error');

    } else {

        inputPorcentaje.classList.remove('error');

    }

    return error;
}




let obtenerDatos = async () => {
    let nombre = inputNombre.value;
    let porcentaje = inputPorcentaje.value;
    porcentaje = porcentaje / 100;

    if (validar()) {

        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos se encuentran vacíos o son incorrectos',
            text: 'Por favor inténtelo de nuevo',
            confirmButtonText: 'Entendido'
        })


    } else {

        let error = await registrarImpuesto(nombre, porcentaje);

        if (error.resultado == false) {

            Swal.fire({
                icon: 'warning',
                title: 'El impuesto ya existe en el sistema',
                confirmButtonText: 'Entendido'
            })

        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'El impuesto ha sido almacenado',
                confirmButtonText: "Entendido"
            })
        }

        inputNombre.value = '';
        inputPorcentaje.value = '';
    }

}


btnGuardar.addEventListener('click', obtenerDatos);