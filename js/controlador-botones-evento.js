let listaBotones = document.querySelectorAll('#descuentos-impuestos a');

let gradoUsuario = sessionStorage.getItem('gradoUsuario');

if (gradoUsuario != 1 || gradoUsuario != 2) {
    listaBotones[0].classList.add('ocultar');
    listaBotones[1].classList.add('ocultar');
}