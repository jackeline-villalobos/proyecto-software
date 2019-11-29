'use strict';

const input_primerNombre = document.querySelector('#txt_primerNombre');
const input_segundoNombre = document.querySelector('#txt_segundoNombre');
const input_primerApellido = document.querySelector('#txt_primerApellido');
const input_segundoApellido = document.querySelector('#txt_segundoApellido');
const input_correo = document.querySelector('#txt_correo');
const input_FechaDeNacimiento = document.querySelector('#txt_fechaDeNacimiento');
const input_genero = document.querySelector('#txt_genero');
const slt_provicias = document.querySelector('#provincias');
const slt_cantones = document.querySelector('#cantones');
const slt_distritos = document.querySelector('#distritos');
const input_direccion = document.querySelector('#direccion');
const input_imagen = document.querySelector('#imagePreview');

const btn_registrar = document.querySelector('#btn-registrar');


//obtener datoss

let validar = () => {

    let error = false;
    let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

    if (input_primerNombre.value == 0) {
        error = true;
        input_primerNombre.classList.add('error');
    } else {
        input_primerNombre.classList.remove('error');
    };

    /*if (input_segundoNombre.value == '') {
        error = true;
        input_segundoNombre.classList.add('error');
    } else {
        input_segundoNombre.classList.remove('error');
    };*/


    if (input_primerApellido.value == 0) {
        error = true;
        input_primerApellido.classList.add('error');
    } else {
        input_primerApellido.classList.remove('error');
    };


    /*if (input_segundoApellido.value == '') {
        error = true;
        input_segundoApellido.classList.add('error');
    } else {
        input_segundoApellido.classList.remove('error');
    };*/


    if (input_correo.value == 0) {
        error = true;
        input_correo.classList.add('error');
    } else {
        input_correo.classList.remove('error');
    };

    if (revisar_correo.test(input_correo.value) == false) {
        error = true;
        input_correo.classList.add('error');
    } else {
        input_correo.classList.remove('error');
    }

    if (input_FechaDeNacimiento.value == 0) {
        error = true;
        input_FechaDeNacimiento.classList.add('error');
    } else {
        input_FechaDeNacimiento.classList.remove('error');
    };


    if (input_genero.value == 0) {
        error = true;
        input_genero.classList.add('error');
    } else {
        input_genero.classList.remove('error');
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

    if (input_direccion.value == 0) {
        error = true;
        input_direccion.classList.add('error');
    } else {
        input_direccion.classList.remove('error')
    };

    if (input_imagen.src == 'imagenes/registrar-evento/outlined_placeholder-512.png') {
        error = true;
        input_imagen.classList.add('error');
    } else {
        input_imagen.classList.remove('error');
    };


    if (!validarFecha(input_FechaDeNacimiento.value)) {
        error = true;
        input_FechaDeNacimiento.classList.add('error');
    } else {
        input_FechaDeNacimiento.classList.remove('error');
    }
    
    return error


};

    
let validarFecha = (fechaDeNacimiento) => {
    
    let resultado = false;

    let hoy = new Date();
    let cumpleannos = new Date(fechaDeNacimiento);
    let edad = hoy.getFullYear() - cumpleannos.getFullYear();
    let m = hoy.getMonth() - cumpleannos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() <= cumpleannos.getDate())) {
        edad--;
    }

    if(edad >= 18) {
        resultado = true;
    } 

    return resultado;

}

let obtener_datos = async() => {
    let primerNombre = input_primerNombre.value;
    let segundoNombre = input_segundoNombre.value;
    let primerApellido = input_primerApellido.value;
    let segundoApellido = input_segundoApellido.value;
    let correo = input_correo.value;
    let fechaDeNacimiento = input_FechaDeNacimiento.value;
    let genero = input_genero.value;
    let provincia = slt_provicias.value;
    let canton = slt_cantones.value;
    let distrito = slt_distritos.value;
    let direccion = input_direccion.value;
    let imagen = imagePreview.src;

    if (validar()) {
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })

    } else {


        let correoError = await verificarCorreo(correo);

        if(!correoError) {
            input_correo.classList.add('error');
            Swal.fire({
                type: 'warning',
                title: 'El usuario ya ha sido registrado',
                confirmButtonText: 'Entendido'
            });
        } else {
            let error = await registrar_usuario(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, genero, provincia, canton, distrito, direccion, imagen);

            if (error.resultado == false) {
    
                Swal.fire({
                    type: 'warning',
                    title: 'Algo salió mal',
                    confirmButtonText: 'Entendido'
                });
    
            } else {
    
                //sessionStorage.setItem('idNuevoUsuario', error.data._id);
    
                Swal.fire({
                    type: 'success',
                    title: 'Registro realizado con éxito',
                    text: 'El usuario ha sido registrado',
                    confirmButtonText: 'Entendido',
                    costumClass: 'modal',
                    onClose: function() {
                        location.href = 'index.html';
                    }
                });
    
                input_primerNombre.value = '';
                input_segundoNombre.value = '';
                input_primerApellido.value = '';
                input_segundoApellido.value = '';
                input_correo.value = '';
                input_FechaDeNacimiento.value = '';
                input_genero.value = '';
                slt_provicias.value = '';
                slt_cantones.value = '';
                slt_distritos.value = '';
                input_direccion.value = ''
    
    
            }
        }

    };
}


btn_registrar.addEventListener('click', obtener_datos);