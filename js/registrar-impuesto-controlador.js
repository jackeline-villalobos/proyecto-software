'use strict';

const inputNombre = document.querySelector('#txt_nombreImpuesto');
const inputPorcentaje = document.querySelector('#txt_porcentaje');
const btnGuardar = document.querySelector('#btn_guardar');

let validar = () => {
    let error = false;

    if(inputNombre.value == 0) {

        error = true;
        inputNombre.classList.add('error');

    } else {

        inputNombre.classList.remove('error');

    }

    if(inputPorcentaje.value == 0) {

        error = true;
        inputPorcentaje.classList.add('error');

    } else {

        inputPorcentaje.classList.remove('error');

    }

    return error;
}




let obtenerDatos = () => {
    let nombre = inputNombre.value;
    let porcentaje = inputPorcentaje.value;
    porcentaje = porcentaje/100;

    if(validar()) {

        Swal.fire(
            {
                icon: 'warning',
                title: 'Algunos de los campos se encuentran vacíos',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: "Entendido"
            }
        )

    } else {

          registrarImpuesto(nombre, porcentaje);

        Swal.fire(
            {
                icon: 'success',
                title: 'Registro realizado con éxito',
                text: 'El impuesto ha sido almacenado',
                confirmButtonText: "Entendido"
            }
        )
            inputNombre.value = '';
            inputPorcentaje.value = '';
    }

}


btnGuardar.addEventListener('click', obtenerDatos);