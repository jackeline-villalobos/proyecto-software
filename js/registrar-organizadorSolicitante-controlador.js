'use strict';

const input_nombreEmpresa = document.querySelector('#txt-nombreEmpresa');
const input_cedulaJuridica = document.querySelector('#txt-cedulaJuridica');
const input_experiencia = document.querySelector('#txt-experiencia');
const input_nombreComercial = document.querySelector('#txt-nombreComercial');

const slt_provicias = document.querySelector('#provincias');
const slt_cantones = document.querySelector('#cantones');
const slt_distritos = document.querySelector('#distritos');
const input_sennas = document.querySelector('#txt-sennas');

const input_nombreCompleto = document.querySelector('#txt-nombreCompleto');
const input_correo = document.querySelector('#txt_correo');
const input_telefono = document.querySelector('#txt-telefono');
const input_genero = document.querySelector('#txt-genero');

const btn_enviarInfo = document.querySelector('#btn-enviarInfo');


let validar = () => {

    let error = false;
    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    if (input_nombreEmpresa.value == '') {
        error = true;
        input_nombreEmpresa.classList.add('error');
    } else {
        input_nombreEmpresa.classList.remove('error');
    };

    if (input_cedulaJuridica.value == '') {
        error = true;
        input_cedulaJuridica.classList.add('error');
    } else {
        input_cedulaJuridica.classList.remove('error');
    };

    if (input_experiencia.value == '' && input_experiencia.value > 0) {
        error = true;
        input_experiencia.classList.add('error');
    } else {
        input_experiencia.classList.remove('error');
    };

    if (input_nombreComercial.value == '') {
        error = true;
        input_nombreComercial.classList.add('error');
    } else {
        input_nombreComercial.classList.remove('error');
    };

    if (slt_provicias.value == '') {
        error = true;
        slt_provicias.classList.add('error');
    } else {
        slt_provicias.classList.remove('error')
    };

    if (slt_cantones.value == '') {
        error = true;
        slt_cantones.classList.add('error');
    } else {
        slt_cantones.classList.remove('error')
    };

    if (slt_distritos.value == '') {
        error = true;
        slt_distritos.classList.add('error');
    } else {
        slt_distritos.classList.remove('error')
    };

    if (input_sennas.value == '') {
        error = true;
        input_sennas.classList.add('error');
    } else {
        input_sennas.classList.remove('error')
    };

    if (input_nombreCompleto.value == '') {
        error = true;
        input_nombreCompleto.classList.add('error');
    } else {
        input_nombreCompleto.classList.remove('error')
    };

    if (revisar_correo.test(input_correo.value) == false) {
        error = true;
        input_correo.classList.add('error');
    } else {
        input_correo.classList.remove('error');
    }

    if (input_telefono.value == "" || input_telefono.value.length > 8 || input_telefono.value == " ") {
        error = true;
        input_telefono.classList.add('error');
    } else {
        input_telefono.classList.remove('error');
    }

    if (input_genero.value == '') {
        error = true;
        input_genero.classList.add('error');
    } else {
        input_genero.classList.remove('error');
    };

    return error
};

let resetForm = () => {
    input_nombreEmpresa.value = '';
    input_cedulaJuridica.value = '';
    input_experiencia.value = '';
    input_nombreComercial.value = '';

    slt_provicias.value = '';
    slt_cantones.value = '';
    slt_distritos.value = '';
    input_sennas.value = '';

    input_nombreCompleto.value = '';
    input_correo.value = '';
    input_telefono.value = '';
    input_genero.value = '';
};

let obtener_datos = async () => {

    let nombreEmpresa = input_nombreEmpresa.value;
    let cedulaJuridica = input_cedulaJuridica.value;
    let experiencia = input_experiencia.value;
    let nombreComercial = input_nombreComercial.value;
    let provincia = slt_provicias.value;
    let canton = slt_cantones.value;
    let distrito = slt_distritos.value;
    let sennas = input_sennas.value;
    let nombreCompleto = input_nombreCompleto.value;
    let correo = input_correo.value;
    let telefono = input_telefono.value;
    let genero = input_genero.value;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })
    } else {

        let errorCorreo = await verificarCorreo(correo);

        if (!errorCorreo) {
            input_correo.classList.add('error');
            Swal.fire({
                type: 'warning',
                title: 'El usuario ya ha sido registrado',
                confirmButtonText: 'Entendido'
            });
        } else {

            let error = await registrar_organizadorSolicitante(nombreEmpresa, cedulaJuridica, experiencia,
                nombreComercial, provincia, canton, distrito, sennas, nombreCompleto,
                correo, telefono, genero);

            if (error.resultado == false) {
                Swal.fire({
                    type: 'warning',
                    title: 'Algo salió mal',
                    confirmButtonText: 'Entendido'
                });
            } else {
                Swal.fire({
                    type: 'success',
                    title: 'La solicitud se envió con éxito',
                    text: 'Usted recibirá un correo en las próximas horas',
                    confirmButtonText: 'Entendido',
                    onClose: function() {
                        location.href = 'index.html';
                    }
                });
                resetForm();
            }


        }



    };

};

//eventos
btn_enviarInfo.addEventListener('click', obtener_datos);