const grado = sessionStorage.getItem('gradoUsuario');

if (grado == 2 ) {
    window.location.href = '../perfil-encargado.html';

} else if(grado == 3) {
    window.location.href = '../perfil-organizador.html';
} else if(grado == 5) {
    window.location.href = '../perfil-empresa.html';
}