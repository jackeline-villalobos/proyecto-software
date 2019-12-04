'use strict';

const inputNombre = document.querySelector('#txt-nombreImpuesto');
const inputPorcentaje = document.querySelector('#txt-porcentaje');
const btnGuardar = document.querySelector('#btn-guardar');
const idImpuesto = sessionStorage.getItem('impuesto');
const nombreImpuesto = sessionStorage.getItem('nombreImpuesto');
const porcentajeImpuesto = sessionStorage.getItem('porcentajeImpuesto');



let llenarForm = () => {

    inputNombre.setAttribute('placeholder', `${nombreImpuesto}`);
    inputPorcentaje.setAttribute('placeholder', `${porcentajeImpuesto}`);

}


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




let obtenerDatos = async() => {

    let nombre = inputNombre.value.toLowerCase();
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

        let error = await modificarImpuesto(idImpuesto ,nombre, porcentaje);

        if (error.resultado == false) {

            Swal.fire({
                icon: 'warning',
                title: 'El impuesto no se ha podido modificar correctamente',
                confirmButtonText: 'Entendido'
            })

        } else {
            Swal.fire({
                icon: 'success',
                title: 'Cambios realizados con éxito',
                text: 'El impuesto ha sido modificado',
                confirmButtonText: "Entendido",
                onClose: function() {
                    sessionStorage.removeItem('impuesto');
                    sessionStorage.removeItem('porcentajeImpuesto');
                    sessionStorage.removeItem('nombreImpuesto');
                    location.href = 'perfil-administrador.html';
                }
            })
        }

        inputNombre.value = '';
        inputPorcentaje.value = '';
    }

}

llenarForm();
btnGuardar.addEventListener('click', obtenerDatos);
