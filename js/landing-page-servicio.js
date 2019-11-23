'use strict';

const inputCorreo = document.querySelector('#txt-correo');
const btnComenzar = document.querySelector('#btn-comenzar');


let validar = () => {
    let validarCorreo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    let error = false;

    if(inputCorreo.value == 0) {
        error = true;
        inputCorreo.classList.add('error');
    } else {
        inputCorreo.classList.remove('error');
    }

    if(validarCorreo.test(inputCorreo.value) == false) {
        error = true;
        inputCorreo.classList.add('error');
    }
    console.log(error);
    return error;

}


let mandarInfo = async () => {
    const correo = inputCorreo.value;
    console.log(correo);

    if(!validar()) {
        
    } else {
        
    }
}



btnComenzar.addEventListener('click', mandarInfo);