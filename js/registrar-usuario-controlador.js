'use strict';

const input_primerNombre = document.querySelector('#txt_primerNombre');
const  input_segundoNombre= document.querySelector('#txt_segundoNombre');
const  input_primerApellido= document.querySelector('#txt_primerApellido');
const  input_segundoApellido= document.querySelector('#txt_segundoApellido');
const  input_correo= document.querySelector('#txt_correo');
const  input_fechaDeNacimiento= document.querySelector('#txt_fechaDeNacimiento');
const  input_genero= document.querySelector('#txt_genero');
const  btn_registrar= document.querySelector('#btn-registrar');


//obtener datos

let validar = () =>{

    let error= false;

    if(input_primerNombre.value == ''){
        error = true;
        input_primerNombre.classList.add('error');
    }else{
        input_primerNombre.classList.remove('error');
    };


    if(input_segundoNombre == ''){
        error = true;
        input_segundoNombre.classList.add('error');
    }else{
        input_segundoNombre.classList.remove('error');
    };


    if(input_primerApellido == ''){
        error = true;
        input_primerApellido.classList.add('error');
    }else{
        input_primerApellido.classList.remove('error');
    };
    

    if(input_segundoApellido == ''){
        error = true;
        input_segundoApellido.classList.add('error');
    }else{
        input_segundoApellido.classList.remove('error');
    };



    if(input_correo == ''){
        error = true;
        input_correo.classList.add('error');
    }else{
        input_correo.classList.remove('error');
    };


    if(input_fechaDeNacimiento == ''){
        error = true;
        input_fechaDeNacimiento.classList.add('error');
    }else{
        input_fechaDeNacimiento.classList.remove('error');
    };


    if(input_genero == ''){
        error = true;
        input_genero.classList.add('error');
    }else{
        input_genero.classList.remove('error');
    };
};


let obtener_datos = ()=>{
    let primerNombre = input_primerNombre.value;
    let segundoNombre = input_segundoNombre.value;
    let primerApellido = input_primerApellido.value;
    let segundoApellido = input_segundoApellido.value;
    let correo = input_correo.value;
    let fechaDeNacimiento = input_fechaDeNacimiento.value;
    let genero = input_genero.value;


    if (validar()){
        Swal.fire({
            type: 'warning',
            title: 'Algunos de los campos se encuentran incompletos',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        })

    }else{
        console.log(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, fechaDeNacimiento, genero);
        
        Swal.fire({
            type: 'success',
            title: 'Registro realizado con éxiro',
            text: 'El producto ha sido almacenado',
            confirmButtonText: 'Entendido'
        });


    }


};





//Botones

btn_registrar.addEventListener('click', obtener_datos);