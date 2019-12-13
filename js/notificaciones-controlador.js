const notificacion = document.querySelector('#click-notificacion');
const dropdown = document.querySelector('#dropdown');
const notificaciones = document.querySelector('#notificaciones');
const infoNotificacion = document.querySelector('#info-notificacion');
let userMail = sessionStorage.getItem('correoUsuario');

let notificacionesUsers = async () => {

    let usuario;

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/buscar-usuario-correo/${userMail}`,
        responseType: 'json'
    })
    .then(async function(res) {
        usuario = await res.data.usuario;
    })
    .catch(function(err){
        console.log(err);
    }); 

    console.log(usuario);

    let titulo = document.querySelector('#titulo-notificacion');
    let comentario = document.querySelector('#descripcion-notificacion');
    let hora = document.querySelector('#hora-notificacion');

    console.log(usuario.notificaciones.length);

    if(usuario.notificaciones.length == 0) {

        let tituloNotificacion = 'No tienes notificaciones';


        titulo.innerHTML = tituloNotificacion;
    
    } else {
        for(let i = 0; i < usuario.notificaciones.length ; i++){
            let tituloNotificacion = usuario.notificaciones[i]['titulo'];
            let descripcionNotificacion = usuario.notificaciones[i]['descripcion'];
            let fechaNotificacion = usuario.notificaciones[i]['fecha'];
    
            titulo.innerHTML = tituloNotificacion;
            comentario.innerHTML = descripcionNotificacion;
            hora.innerHTML = fechaNotificacion;

            infoNotificacion.appendChild(titulo);
            infoNotificacion.appendChild(comentario);
            infoNotificacion.appendChild(hora);

            dropdown.appendChild(infoNotificacion);
    
        }
    }   
}

notificacionesUsers();

notificacion.addEventListener('click', function(e){
    e.preventDefault();
    dropdown.classList.toggle('active');
});


// notificacion.addEventListener('mouseout', function(e){
//     e.preventDefault();
//     dropdown.classList.toggle('active');
// });
