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

const opt_provincia = document.querySelector('#provinciaOpt');
const opt_canton = document.querySelector('#cantonOpt');
const opt_distrito = document.querySelector('#distritoOpt');
const opt_genero = document.querySelector('#generoOpt')

const btn_enviarInfo = document.querySelector('#btn-enviarInfo');

const idUsuario = sessionStorage.getItem('idUsuario');

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

    input_nombreEmpresa.setAttribute('placeholder', `${nombreEmpresa}`);
    input_cedulaJuridica.setAttribute('placeholder', `${cedulaJuridica}`);
    input_experiencia.setAttribute('placeholder', `${experiencia}`);
    input_nombreComercial.setAttribute('placeholder', `${nombreComercial}`);

    opt_provincia.innerHTML = provincia;
    opt_canton.innerHTML = canton;
    opt_distrito.innerHTML = distrito;

    input_sennas.setAttribute('placeholder', `${sennas}`);
    input_nombreCompleto.setAttribute('placeholder', `${nombreCompleto}`);
    input_correo.setAttribute('placeholder', `${correo}`);
    input_telefono.setAttribute('placeholder', `${telefono}`);

    opt_genero.innerHTML = genero;

    console.log(nombreEmpresa)
};
mostrarInfo()