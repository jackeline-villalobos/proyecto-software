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
        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/mail-landing-page',
            responseType: 'json',
            data : {
                correo: correo
            }
        })
        .then(function(res){
            console.log(res.data.msg);
        })
        .catch(function(err){
            console.log(err);
        });
        
    } else {
        console.log('No se pudo envíar el correo');
    }
}

btnComenzar.addEventListener('click', mandarInfo);