'use strict';

const inputFiltro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-usuarios tbody');

let activar_organizador = async() => {



};

let llenarTabla = async() => {
    let filtro = inputFiltro.value.toLowerCase();
    let listaUsuarios = await listarUsuarios();
    console.log(listaUsuarios);

    tableBody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.clientes.length; i++) {
        let nombre = listaUsuarios.clientes[i]['primerNombre'].toLowerCase();
        let primerApellido = listaUsuarios.clientes[i]['primerApellido'].toLowerCase();
        let correo = listaUsuarios.clientes[i]['correo'].toLowerCase();

        if (nombre.includes(filtro) || primerApellido.includes(filtro) || correo.includes(filtro)) {
            let fila = tableBody.insertRow();
            let btnPerfil = document.createElement('button');
            btnPerfil.innerHTML = ('Ver más')
            btnPerfil.classList.add('btn-mas');

            let btnEditar = document.createElement("button");
            btnEditar.innerHTML = ("Editar");
            btnEditar.classList.add("btn-mas");
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]['primerNombre'];
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]['primerApellido'];
            //fila.insertCell().innerHTML = listaUsuarios.clientes[i]['genero'];
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]['correo'];
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]['grado'];

            fila.insertCell().appendChild(btnPerfil).innerHTML;
            btnPerfil.dataset._id = listaUsuarios.clientes[i]['_id'];
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]["estado"];
            btnEditar.dataset._id = listaUsuarios.clientes[i]['_id'];
            fila.insertCell().innerHTML = listaUsuarios.clientes[i]["baneado"];
            fila.insertCell().appendChild(btnEditar).innerHTML;


            btnPerfil.addEventListener('click', function() {
                let correoUsuario = listaUsuarios.clientes[i]['correo'];
                sessionStorage.setItem('correoUsuarioPerfil', correo);
                window.location.href = 'perfil-usuario-lista.html';


            });
            btnEditar.addEventListener("click", function() {
                let correoUsuario = listaUsuarios.clientes[i]['correo'];
                sessionStorage.setItem("idUsuarioPerfil", listaUsuarios.clientes[i]["_id"]);
                sessionStorage.setItem('correoUsuarioPerfil', correo);
                sessionStorage.setItem("estadoUsuarioPerfil", listaUsuarios.clientes[i]["estado"]);
                sessionStorage.setItem("baneadoUsuarioPerfil", listaUsuarios.clientes[i]["baneado"]);
                window.location.href = 'editar-usuario-administrador.html';
            });
        };
    };

    /*for (let i = 0; i < listaUsuarios.organizadores.length; i++) {
        let fila = tableBody.insertRow();
        let nombre = listaUsuarios.organizadores[i]['nombreEmpresa'].toLowerCase();
        let correo = listaUsuarios.organizadores[i]['correo'].toLowerCase();

        let btnPerfil = document.createElement('button');
        btnPerfil.innerHTML = ('Ver más')
        btnPerfil.classList.add('btn-mas');

        if (nombre.includes(filtro) || correo.includes(filtro)) {

            fila.insertCell().innerHTML = listaUsuarios.organizadores[i]['nombreEmpresa'];
            fila.insertCell().innerHTML = '';
            fila.insertCell().innerHTML = listaUsuarios.organizadores[i]['correo'];
            fila.insertCell().innerHTML = listaUsuarios.organizadores[i]['grado'];

            fila.insertCell().appendChild(btnPerfil).innerHTML;
            btnPerfil.dataset._id = listaUsuarios.organizadores[i]['_id'];
            btnPerfil.addEventListener('click', function () {
                sessionStorage.setItem('idPerfilUsuario', this.dataset._id);
                window.location.href = 'perfil-usuario.html';
            });

        }
    }

    for (let i = 0; i < listaUsuarios.empresas.length; i++) {
        let fila = tableBody.insertRow();
        let nombre = listaUsuarios.empresas[i]['nombreEmpresa'].toLowerCase();
        //let correo = listaUsuarios.empresas[i]['correo'];

        let btnPerfil = document.createElement('button');
        btnPerfil.innerHTML = ('Ver más')
        btnPerfil.classList.add('btn-mas');

        if (nombre.includes(filtro) || correo.includes(filtro)) {
            fila.insertCell().innerHTML = listaUsuarios.empresas[i]['nombreEmpresa'];
            fila.insertCell().innerHTML = '';
            fila.insertCell().innerHTML = listaUsuarios.empresas[i]['correo'];
            fila.insertCell().innerHTML = listaUsuarios.empresas[i]['grado'];

            fila.insertCell().appendChild(btnPerfil).innerHTML;
            btnPerfil.dataset._id = listaUsuarios.empresas[i]['_id'];
            btnPerfil.addEventListener('click', function () {
                sessionStorage.setItem('idPerfilUsuario', this.dataset._id);
                window.location.href = 'perfil-usuario.html';
            });
        }
    }

    for(let i = 0; i<listaUsuarios.encargados.length; i++) {
        let fila = tableBody.insertRow();
        let nombre = listaUsuarios.encargados[i]['nombreCompleto'].toLowerCase();
        let correo = listaUsuarios.encargados[i]['correoElectronico'].toLowerCase();

        let btnPerfil = document.createElement('button');
        btnPerfil.innerHTML = ('Ver más')
        btnPerfil.classList.add('btn-mas');

        if(nombre.includes(filtro) || correo.includes(filtro)) {
            fila.insertCell().innerHTML = listaUsuarios.encargados[i]['nombreCompleto'];
            fila.insertCell().innerHTML = '';
            fila.insertCell().innerHTML = listaUsuarios.encargados[i]['correoElectronico'];
            fila.insertCell().innerHTML = listaUsuarios.encargados[i]['grado'];

            fila.insertCell().appendChild(btnPerfil).innerHTML;
            btnPerfil.dataset._id = listaUsuarios.empresas[i]['_id'];
            btnPerfil.addEventListener('click', function () {
                sessionStorage.setItem('idPerfilUsuario', this.dataset._id);
                window.location.href = 'perfil-usuario.html';
            });
        }
    }*/

};

llenarTabla();

inputFiltro.addEventListener('keyup', llenarTabla);