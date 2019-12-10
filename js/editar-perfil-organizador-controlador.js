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

// const opt_provincia = document.querySelector('#provinciaOpt');
// const opt_canton = document.querySelector('#cantonOpt');
// const opt_distrito = document.querySelector('#distritoOpt');
// const opt_genero = document.querySelector('#generoOpt')

const btn_enviarInfo = document.querySelector('#btn-enviarInfo');


let mostrarInfo = async () =>{

    let organizador = await obtenerDatos();

    let nombreEmpresa = organizador.organizador.nombreEmpresa;
    let cedulaJuridica = organizador.organizador.cedulaJuridica;
    let experiencia = organizador.organizador.experiencia;
    let nombreComercial = organizador.organizador.nombreComercial;
    let provincia = organizador.organizador.provincia;
    let canton = organizador.organizador.canton;
    let distrito = organizador.organizador.distrito;
    let sennas = organizador.organizador.sennas;
    let nombreCompleto = organizador.organizador.nombreCompleto;
    let correo = organizador.organizador.correo;
    let telefono = organizador.organizador.telefono;
    let genero = organizador.organizador.genero;
    
    input_nombreEmpresa.value = nombreEmpresa;
    input_cedulaJuridica.value = cedulaJuridica;
    input_experiencia.value = experiencia;
    input_nombreComercial.value = nombreComercial;

    slt_provicias.value = provincia;
    slt_cantones.value = canton;
    slt_distritos.value = distrito;

    input_sennas.value = sennas;
    input_nombreCompleto.value = nombreCompleto;
    input_correo.value=correo;
    input_telefono.value = telefono;

    input_genero.value = genero;

};

let validar = () => {
    let error = false;
    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    if (input_nombreEmpresa.value == 0) {
        error = true;
        input_nombreEmpresa.classList.add('error');
    } else {
        input_nombreEmpresa.classList.remove('error');
    };

    if (input_cedulaJuridica.value == 0) {
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

    if (input_nombreComercial.value == 0) {
        error = true;
        input_nombreComercial.classList.add('error');
    } else {
        input_nombreComercial.classList.remove('error');
    };

    if (slt_provicias.value == 0) {
        error = true;
        slt_provicias.classList.add('error');
    } else {
        slt_provicias.classList.remove('error')
    };

    if (slt_cantones.value == 0) {
        error = true;
        slt_cantones.classList.add('error');
    } else {
        slt_cantones.classList.remove('error')
    };

    if (slt_distritos.value == 0) {
        error = true;
        slt_distritos.classList.add('error');
    } else {
        slt_distritos.classList.remove('error')
    };

    if (input_sennas.value == 0) {
        error = true;
        input_sennas.classList.add('error');
    } else {
        input_sennas.classList.remove('error')
    };

    if (input_nombreCompleto.value == 0) {
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

    if (input_telefono.value == "" || input_telefono.value.length > 8 || input_telefono.value == 0) {
        error = true;
        input_telefono.classList.add('error');
    } else {
        input_telefono.classList.remove('error');
    }

    if (input_genero.value == 0) {
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

        let error = await editarOrganizador(idUsuario, nombreEmpresa, cedulaJuridica, experiencia,
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
                title: 'Los datos se actualizaron con éxito',
                confirmButtonText: 'Entendido',
                onClose: function () {
                    sessionStorage.removeItem('nombreEmpresa');
                    sessionStorage.removeItem('cedulaJuridica');
                    sessionStorage.removeItem('experiencia');
                    sessionStorage.removeItem('nombreComercial');
                    sessionStorage.removeItem('provincia');
                    sessionStorage.removeItem('canton');
                    sessionStorage.removeItem('distrito');
                    sessionStorage.removeItem('sennas');
                    sessionStorage.removeItem('nombreCompleto');
                    sessionStorage.removeItem('correo');
                    sessionStorage.removeItem('pcontrasenna');
                    sessionStorage.removeItem('telefono');
                    sessionStorage.removeItem('genero');
                    location.href = 'perfil-organizador.html';
                }
            });
            resetForm();
        }
    }
};

mostrarInfo()
btn_enviarInfo.addEventListener('click', obtener_datos);