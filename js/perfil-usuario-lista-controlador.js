'use strict'

const foto_perfil_container = document.querySelector('#foto_perfil_container');
const nombre_container = document.querySelector('#nombre_container');
const informacion_container = document.querySelector('#informacion_container');
const fechaDeNacimiento_container = document.querySelector('#fechaDeNacimiento_container');
const correo_container = document.querySelector('#correo_container');
const genero_container = document.querySelector('#genero_container');
const direccion_container = document.querySelector('#direccion_container');
const casa_container = document.querySelector('#direccionCasa_container');
const provincia_container = document.querySelector('#provincia_container');
const canton_container = document.querySelector('#canton_container');
const distrito_container = document.querySelector('#distrito_container');
const correoUsuarioP = sessionStorage.getItem('correoUsuarioPerfil');



let mostrarInfo = async() => {

    let usuario = await perfilUsuario();
    console.log(usuario);

    //Foto de perfil
    let imagen = usuario.imagen;
    let img = document.createElement('img');
    img.src = `${imagen}`;
    img.classList.add('img');
    foto_perfil_container.appendChild(img);

    //Nombre completo
    let primerNombre = usuario.primerNombre;
    let pNombre = document.createElement('h3');
    pNombre.innerText = primerNombre;

    let segundoNombre = usuario.segundoNombre;
    let sNombre = document.createElement('h3');
    sNombre.innerText = segundoNombre;

    let primerApellido = usuario.primerApellido;
    let pApellido = document.createElement('h3');
    pApellido.innerText = primerApellido;

    let segundoApellido = usuario.segundoApellido;
    let sApellido = document.createElement('h3');
    sApellido.innerText = segundoApellido;

    nombre_container.appendChild(pNombre);
    nombre_container.appendChild(sNombre);
    nombre_container.appendChild(pApellido);
    nombre_container.appendChild(sApellido);

    //Informacion

    let fechaDeNacimiento = usuario.fechaDeNacimiento;
    let fnacimiento = document.createElement('p');

    let fechaFormatoViejo = fechaDeNacimiento.substring(0, 10);

    console.log("fecha vieja: " + fechaFormatoViejo);
    let ano = fechaFormatoViejo.substring(0, 4);
    console.log("ano: " + ano);
    let mes = fechaFormatoViejo.substring(5, 7);
    console.log("mes: " + mes);
    let dia = fechaFormatoViejo.substring(8, 10);
    console.log("dia: " + dia);

    let fechaNueva = dia + "-" + mes + "-" + ano;

    fnacimiento.innerText = fechaNueva;

    fechaDeNacimiento_container.appendChild(fnacimiento)

    let correoUsuario = usuario.correo;
    let ucorreo = document.createElement('p');
    ucorreo.innerText = correoUsuario;

    correo_container.appendChild(ucorreo);

    let genero = usuario.genero;
    let ugenero = document.createElement('p')
    ugenero.innerText = genero;

    genero_container.appendChild(ugenero);

    //Direccion

    let casa = usuario.direccion;
    let ucasa = document.createElement('p')
    ucasa.innerText = casa;

    casa_container.appendChild(ucasa);

    let provincia = usuario.provincia;
    let uprovincia = document.createElement('p');
    uprovincia.innerText = provincia;

    provincia_container.appendChild(uprovincia);

    let canton = usuario.canton;
    let ucanton = document.createElement('p');
    ucanton.innerText = canton;

    provincia_container.appendChild(ucanton);

    let distrito = usuario.distrito;
    let udistrito = document.createElement('p');
    udistrito.innerText = distrito;

    provincia_container.appendChild(udistrito);


};

mostrarInfo();