let listaBotones = document.querySelectorAll('#descuentos-impuestos a');

let grado = sessionStorage.getItem('gradoUsuario');

if (grado == 3 || grado == 4) {
    listaBotones[0].classList.add('ocultar');
    listaBotones[1].classList.add('ocultar');
} else {
    listaBotones[0].classList.remove('ocultar');
    listaBotones[1].classList.remove('ocultar');
}