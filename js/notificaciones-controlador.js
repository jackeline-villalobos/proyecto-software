const notificacionClick = document.querySelector('#click-notificacion');
const dropdown = document.querySelector('#dropdown');
//const notificaciones = document.querySelector('#notificaciones');
//const infoNotificacion = document.querySelector('#info-notificacion');
let userMail = sessionStorage.getItem('correoUsuario');
//const notificacionContainer = document.querySelector('#notificacion-container');
const userState = sessionStorage.getItem('conectado');
const userGrade = sessionStorage.getItem('gradoUsuario');

let notificacionesUsers = async() => {

    let usuario;

    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/buscar-usuario-correo/${userMail}`,
            responseType: 'json'
        })
        .then(async function(res) {
            usuario = await res.data.usuario;
        })
        .catch(function(err) {
            console.log(err);
        });

    console.log(usuario);

    let titulo = document.querySelector('#titulo-notificacion');
    let comentario = document.querySelector('#descripcion-notificacion');
    let hora = document.querySelector('#hora-notificacion');

    console.log(usuario.notificaciones.length);

    if (usuario.notificaciones.length == 0) {

        let tituloNotificacion = 'No tienes notificaciones';

        let notificacion = document.createElement('div');
        notificacion.setAttribute('class', 'notificacion');
        notificacion.setAttribute('id', 'notificacion-container');

        let infoNotificacion = document.createElement('div');
        infoNotificacion.setAttribute('class', 'info-notificacion');
        infoNotificacion.setAttribute('id', 'info-notificacion');

        let imagenNotificacion = document.createElement('div');
        imagenNotificacion.setAttribute('class', 'imagen-notificacion');
        let imagen = document.createElement('img');
        imagen.setAttribute('src', '../imagenes/imagenes_generales/logo sin letras.png');
        imagenNotificacion.appendChild(imagen);

        let titulo = document.createElement('p');
        titulo.setAttribute('class', 'titulo-notificacion');
        titulo.setAttribute('id', 'titulo-notificacion');

        titulo.innerHTML = tituloNotificacion;

        infoNotificacion.appendChild(titulo);
        notificacion.appendChild(imagenNotificacion);
        notificacion.appendChild(infoNotificacion);
        dropdown.appendChild(notificacion);

    } else {
        // for(let i = 0; i < usuario.notificaciones.length ; i++){
        //     let tituloNotificacion = usuario.notificaciones[i]['titulo'];
        //     let descripcionNotificacion = usuario.notificaciones[i]['descripcion'];
        //     let fechaNotificacion = usuario.notificaciones[i]['fecha'];

        //     let container = document.createElement('div');

        //     titulo.innerHTML = tituloNotificacion;
        //     comentario.innerHTML = descripcionNotificacion;
        //     hora.innerHTML = fechaNotificacion;

        //     infoNotificacion.appendChild(titulo);
        //     infoNotificacion.appendChild(comentario);
        //     infoNotificacion.appendChild(hora);

        //     notificacionContainer.appendChild(infoNotificacion);

        //    // dropdown.appendChild(infoNotificacion);

        // }

        //let numNotificaciones = usuario.notificaciones.length;

        for (let i = usuario.notificaciones.length - 1; i >= 0; i--) {
            let notificacion = document.createElement('div');
            notificacion.setAttribute('class', 'notificacion');
            notificacion.setAttribute('id', 'notificacion-container');

            let imagenNotificacion = document.createElement('div');
            imagenNotificacion.setAttribute('class', 'imagen-notificacion');
            let imagen = document.createElement('img');
            imagen.setAttribute('src', '../imagenes/imagenes_generales/logo sin letras.png');
            imagenNotificacion.appendChild(imagen);

            let infoNotificacion = document.createElement('div');
            infoNotificacion.setAttribute('class', 'info-notificacion');
            infoNotificacion.setAttribute('id', 'info-notificacion');

            let tituloNotificacion = document.createElement('p');
            tituloNotificacion.setAttribute('class', 'titulo-notificacion');
            tituloNotificacion.setAttribute('id', 'titulo-notificacion');
            tituloNotificacion.innerHTML = usuario.notificaciones[i]['titulo'];

            let descripcionNotificacion = document.createElement('p');
            descripcionNotificacion.setAttribute('id', 'descripcion-notificacion');
            descripcionNotificacion.innerHTML = usuario.notificaciones[i]['descripcion'];

            let fechaNotificacion = document.createElement('span');
            fechaNotificacion.setAttribute('class', 'hora-notificacion');
            fechaNotificacion.setAttribute('id', 'hora-notificacion');
            fechaNotificacion.innerHTML = usuario.notificaciones[i]['fecha'];

            infoNotificacion.appendChild(tituloNotificacion);
            infoNotificacion.appendChild(descripcionNotificacion);
            infoNotificacion.appendChild(fechaNotificacion);

            notificacion.appendChild(imagenNotificacion);
            notificacion.appendChild(infoNotificacion);

            dropdown.appendChild(notificacion);

        }


    }
}

if (userGrade == 4) {
    notificacionesUsers();
}

notificacionClick.addEventListener('click', function(e) {
    e.preventDefault();
    dropdown.classList.toggle('active');
});


// notificacion.addEventListener('mouseout', function(e){
//     e.preventDefault();
//     dropdown.classList.toggle('active');
// });