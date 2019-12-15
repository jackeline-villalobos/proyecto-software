'use strict';

const inputCorreo = document.querySelector('#txt-correo');
const btnComenzar = document.querySelector('#btn-comenzar');


let validar = () => {
    let validarCorreo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
    let error = false;

    if (inputCorreo.value == 0) {
        error = true;
        inputCorreo.classList.add('error');
    } else {
        inputCorreo.classList.remove('error');
    }

    if (validarCorreo.test(inputCorreo.value) == false) {
        error = true;
        inputCorreo.classList.add('error');
    }
    console.log(error);
    return error;

}


let mandarInfo = async() => {
    const correo = inputCorreo.value;
    console.log(correo);

    if (!validar()) {
        await axios({
                method: 'post',
                url: 'https://proyecto-software-prod.herokuapp.com/api/mail-landing-page',
                responseType: 'json',
                data: {
                    correo: correo
                }
            })
            .then(function(res) {
                console.log(res.data.msg);
            })
            .catch(function(err) {
                console.log(err);
            });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se te ha enviado la información',
            showConfirmButton: false,
            timer: 1500
        })


    } else {
        console.log('No se pudo envíar el correo');
    }
}

btnComenzar.addEventListener('click', mandarInfo);