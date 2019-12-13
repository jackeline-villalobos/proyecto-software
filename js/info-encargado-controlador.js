'use strict';

const correo_container = document.querySelector('#correo_container');
const telefono_container = document.querySelector('#telefono_container');
const nombreCompleto_container = document.querySelector('#nombreCompleto_container');
const fechaNacimiento_container = document.querySelector('#fechaNacimiento_container');
const genero_container = document.querySelector('#genero_container');

const contenedor = document.querySelector('#contenedorCards');


let mostrarInfo = async () =>{

    let encargado = await obtenerDatos();
    //console.log(organizador);

    let correo = encargado.correo;
    let pCorreo = document.createElement('h6');
    pCorreo.innerText = correo;
    correo_container.appendChild(pCorreo);

    let telefono = encargado.telefono;
    let pTelefono = document.createElement('h6');
    pTelefono.innerText = telefono;
    telefono_container.appendChild(pTelefono);

    let nombreCompleto = encargado.nombreCompleto;
    let pNombreCompleto = document.createElement('h6');
    pNombreCompleto.innerText = nombreCompleto;
    nombreCompleto_container.appendChild(pNombreCompleto);

    let fechaNacimiento = encargado.fechaNacimiento;
    let pFechaNacimiento = document.createElement('h6');
    pFechaNacimiento.innerText = fechaNacimiento;
    fechaNacimiento_container.appendChild(pFechaNacimiento);


    let genero = encargado.genero;
    let pGenero = document.createElement('h6');
    pGenero.innerText = genero;
    genero_container.appendChild(pGenero);


    

    
};

let mostrarCards = async ()=>{
    let encargado = await obtenerDatos();
    let listaRecintos = await listaRecintos();
    let filtro = encargado._id;

    //console.log(filtro);
    
    for (let i = 0; i < listaRecintos.length; i++) {
        let creador = listaRecintos[i]['creador'];
        let imagen = listaRecintos[i]['imagen'];
       
        console.log(listaRecintos[i]['creador'])
        if (creador.includes(filtro)) {
            
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            let header = document.createElement('header');
            header.style.backgroundImage = 'url, (`${imagen}`)';
            let img = document.createElement('img');
            img.src = `${imagen}`;

            let nombre = document.createElement('h2');
            nombre.innerText = listaEventos[i]['nombre'];

            let fecha = document.createElement('h3');
            for (let j = 0; j < listaEventos[i]['fechas'].length; j++) {
                fecha.innerText = 'Fechas: ' + listaEventos[i]['fechas'][j]['fecha'];
            }


            let lugar = document.createElement('h4');
            lugar.innerText = 'Lugar: ' + listaEventos[i]['lugar'];

            let precio = document.createElement('h4');
            precio.innerText = 'Precio: ' + listaEventos[i]['precioEntrada'];

            let boton = document.createElement('button');
            boton.classList.add('btn-mas');
            boton.innerHTML = 'Ver más';
            boton.dataset._id = listaEventos[i]['_id'];

            boton.addEventListener('click', function () {
                localStorage.setItem('idEvento', this.dataset._id);
                window.location.href = 'perfil-evento.html';
            });

            contenedor.appendChild(cardDiv);
            cardDiv.appendChild(header);
            header.appendChild(img);
            
            cardDiv.appendChild(nombre);
            cardDiv.appendChild(fecha);
            cardDiv.appendChild(lugar);
            cardDiv.appendChild(precio);
            cardDiv.appendChild(boton);
            
        }
    };
}

mostrarInfo();
mostrarCards()
