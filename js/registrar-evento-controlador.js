'use strict';

const input_nombre = document.querySelector('#txt-nombre');
const input_fecha = document.querySelector('#txt-fecha');
const input_tipo_de_eventos = document.querySelector('#txt-tipo-de-eventos');
const input_lugar = document.querySelector('#txt-lugar');
const input_hora = document.querySelector('#txt-hora');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_imagen = document.querySelector('#imagePreview');
const btn_guardar = document.querySelector('#btn-guardar-registrar-evento');

let validar = () => {

    let error = false;

    if(input_nombre.value == ''){
        error = true;
        input_nombre.classList.add('error');
    }else{
        input_nombre.classList.remove('error');
    };

    if(input_fecha.value == ''){
        error = true;
        input_fecha.classList.add('error');
    }else{
        input_fecha.classList.remove('error');
    };

    if(input_tipo_de_eventos.value == ''){
        error = true;
        input_tipo_de_eventos.classList.add('error');
    }else{
        input_tipo_de_eventos.classList.remove('error');
    };

    if(input_lugar.value == ''){
        error = true;
        input_lugar.classList.add('error');
    }else{
        input_lugar.classList.remove('error');
    };

    if(input_hora.value == ''){
        error = true;
        input_hora.classList.add('error');
    }else{
        input_hora.classList.remove('error');
    };

    if(input_descripcion.value == ''){
        error = true;
        input_descripcion.classList.add('error');
    }else{
        input_descripcion.classList.remove('error');
    };

    if(input_imagen.src == 'imagenes/registrar-evento/outlined_placeholder-512.png'){
         error = true;
         input_imagen.classList.add('error');
     }else{
         input_imagen.classList.remove('error');
     };

    return error;
};

     let resetForm = () => {
         input_nombre.value = '';
         input_fecha.value = '';
         input_tipo_de_eventos.value = '';
         input_lugar.value = '';
         input_hora.value = '';
         input_descripcion.value = '';
         input_imagen.src = "imagenes/registrar-evento/outlined_placeholder-512.png";
     };

    let obtener_datos = () => {

        let nombre = input_nombre.value;
        let fecha = input_fecha.value;
        let tipo_de_eventos = input_tipo_de_eventos.value;
        let lugar = input_lugar.value;
        let hora = input_hora.value;
        let descripcion = input_descripcion.value;
        let imagen = imagePreview.src;
    
        if(validar()){
            Swal.fire({
                type: 'warning',
                title: 'Algunos de los campos se encuentran incorrectos.',
                text: 'Por favor, revise los campos en rojo.',
                confirmButtonText: 'Entendio'
              })
    
        }else{
            registrar_evento(nombre, fecha, tipo_de_eventos, lugar, hora, descripcion, imagen);
            Swal.fire({
                type: 'success',
                title: 'Registro realizado con éxito',
                text: 'El usuario ha sido almacenado',
                confirmButtonText: 'Entendio'
              });
             resetForm();
            }
    };

    btn_guardar.addEventListener('click', obtener_datos);