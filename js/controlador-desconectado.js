const estadoConectado = sessionStorage.getItem('conectado');

let estado = () => {

    if(estadoConectado) {
        window.location.href = '../index.html';
    }

}

estado();