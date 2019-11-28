'use strict';

const nombreEmpresa_container = document.querySelector('#nombreEmpresa_container');
const razonSocial_container = document.querySelector('#razonSocial_container');
const cedulaJuridica_container = document.querySelector('#cedulaJuridica_container');
const telefono_container = document.querySelector('#telefono_container');
const correo_container = document.querySelector('#correo_container');

const provincia_container = document.querySelector('#provincia_container');
const canton_container = document.querySelector('#canton_container');
const distrito_container = document.querySelector('#distrito_container');


const contenedor = document.querySelector('#contenedorCards');


let mostrarInfo = async () =>{

    let empresa = await obtenerDatos();
    console.log(empresa);

    let nombreEmpresa = empresa.empresa.nombreEmpresa;
    let pNombreEmpresa = document.createElement('h6');
    pNombreEmpresa.innerText = nombreEmpresa;
    nombreEmpresa_container.appendChild(pNombreEmpresa);

    let razonSocial = empresa.empresa.razonSocial;
    let pRazonSocial = document.createElement('h6');
    pRazonSocial.innerText = razonSocial;
    razonSocial_container.appendChild(pRazonSocial);

    let cedulaJuridica = empresa.empresa.cedulaJuridica;
    let pCedulaJuridica = document.createElement('h6');
    pCedulaJuridica.innerText = cedulaJuridica;
    cedulaJuridica_container.appendChild(pCedulaJuridica);
        
    let correo = empresa.empresa.correo;
    let pCorreo = document.createElement('h6');
    pCorreo.innerText = correo;
    correo_container.appendChild(pCorreo);

    let telefono = empresa.empresa.telefono;
    let pTelefono = document.createElement('h6');
    pTelefono.innerText = telefono;
    telefono_container.appendChild(pTelefono);

    let provincia = empresa.empresa.provincia;
    let pProvincia = document.createElement('h6');
    pProvincia.innerText = provincia;
    provincia_container.appendChild(pProvincia);

    let canton = empresa.empresa.canton;
    let pCanton = document.createElement('h6');
    pCanton.innerText = canton;
    canton_container.appendChild(pCanton);
    
    let distrito = empresa.empresa.distrito;
    let pDistrito = document.createElement('h6');
    pDistrito.innerText = distrito;
    distrito_container.appendChild(pDistrito);

};

let mostrarCards = async ()=>{
    let empresa = await obtenerDatos();
    let listaEventos = await listarEventos();
    let filtro = empresa.empresa._id;

    //console.log(filtro);
    
    for (let i = 0; i < listaEventos.length; i++) {
        let creador = listaEventos[i]['creador'];
        let imagen = listaEventos[i]['imagen'];
       
        //console.log(listaEventos[i]['creador'])
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
            for (let y = 0; y < listaEventos[i]['fechas'].length; y++) {
                fecha.innerText = 'Fechas: ' + listaEventos[i]['fechas'][y]['fecha'];
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
