'use strict';

const input_filtro = document.querySelector('#txt-filtro');
const tableBody = document.querySelector('#tbl-organizadores tbody');


let listaOrganizadores;


let llenarTabla = async() => {

    let filtro = input_filtro.value.toLowerCase();

    listaOrganizadores = await listar_organizadorSolicitantes();

    tableBody.innerHTML = '';

    for (let i = 0; i < listaOrganizadores.length; i++) {
        let nombre = listaOrganizadores[i]['nombreCompleto'].toLowerCase();
        let nombreEmpresa = listaOrganizadores[i]['nombreEmpresa'].toLowerCase();

        if (nombre.includes(filtro) || nombreEmpresa.includes(filtro)) {
            let fila = tableBody.insertRow();

            let btnActivar = document.createElement('button');
            btnActivar.innerHTML = ('Activar');
            btnActivar.classList.add('btn-activar');

            let btnDesactivar = document.createElement('button');
            btnDesactivar.innerHTML = ('Desactivar');
            btnDesactivar.classList.add('btn-desactivar');



            fila.insertCell().innerHTML = listaOrganizadores[i]['nombreEmpresa'];
            /*
            fila.insertCell().innerHTML = listaOrganizadores[i]['cedulaJuridica'];
            */
            fila.insertCell().innerHTML = listaOrganizadores[i]['experiencia'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['nombreComercial'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['provincia'];
            /*
            fila.insertCell().innerHTML = listaOrganizadores[i]['canton'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['distrito'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['sennas'];
            */
            fila.insertCell().innerHTML = listaOrganizadores[i]['nombreCompleto'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['correo'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['telefono'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['genero'];
            fila.insertCell().innerHTML = listaOrganizadores[i]['estado'];
            fila.insertCell().appendChild(btnActivar).innerHTML;
            fila.insertCell().appendChild(btnDesactivar).innerHTML;

            let idUsuario = listaOrganizadores[i]['_id']
            let activar_organizador = async() => {
                let estado = 'activo';
                let resultado = await modificarEstado(idUsuario, estado);
                console.log(resultado);
            };

            let desactivar_organizador = async() => {
                let estado = 'inactivo';
                let resultado = await modificarEstado(idUsuario, estado);
                console.log(resultado);
            };


            let enviar_correoConfirmacion = async() => {
                let resultado = await enviarCorreoConfirmacion(idUsuario)
                console.log(resultado);
            };

            let enviar_correoRechazo = async() => {
                let resultado = await enviarCorreorRechazo(idUsuario)
                console.log(resultado);
            };

            btnActivar.addEventListener('click', async function() {


                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: '¿Desea enviar los credenciales de ingreso al organizador?',
                    text: "Esta operación es necesaria solo en la primera activación",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si, enviarlos!',
                    cancelButtonText: 'No, ya los tiene!',
                    reverseButtons: false
                }).then((result) => {
                    activar_organizador();
                    enviar_correoConfirmacion();
                    if (result.value) {
                        swalWithBootstrapButtons.fire(
                            'Organizador activado',
                            'Los credenciales de ingreso fueron enviados con éxito al organizador',
                            'success'
                        )

                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Oganizador activado',
                            'El organizador se cambió a activado, pero no fueron enviados nuevos credenciales',
                            'success'
                        )
                        activar_organizador();
                    }
                })
            });

            btnDesactivar.addEventListener('click', async function() {
                // Swal.fire({
                //     title: '¿Desea desactivar el organizador',
                //     text: "El organizador desactivado no podrá llevar acabo acciones dentro de la aplicación",
                //     icon: 'question',
                //     showCancelButton: true,
                //     confirmButtonText: 'Si, desactivar'
                // }).then((result) => {
                //     if (result.value) {
                //         Swal.fire(
                //             'Organizador desactivado',
                //             'El estado fue cambiado a inactivo',
                //             'success'
                //         )
                //         desactivar_organizador();
                //     }
                // })
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: '¿Desea enviar notificación de rechazo?',
                    text: "Esta operación es necesaria si la solicitud está pendiente",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si, enviarlo!',
                    cancelButtonText: 'No',
                    reverseButtons: false
                }).then((result) => {
                    desactivar_organizador();
                    enviar_correoRechazo();
                    if (result.value) {
                        swalWithBootstrapButtons.fire(
                            'Organizador desactivado',
                            'El organizador fue notificado del estado de su solicitud',
                            'success'

                        )

                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Oganizador desactivado',
                            'El organizador se cambió a desactivado',
                            'success'
                        )
                        desactivar_organizador();
                    }
                })
            });

        }
    };
};

llenarTabla();

input_filtro.addEventListener('keyup', llenarTabla);