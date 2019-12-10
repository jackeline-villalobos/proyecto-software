let listaBotones = document.querySelectorAll('#descuentos-impuestos a');
let btn_finalizado = document.querySelector('#eventoFinalizado')

let grado = sessionStorage.getItem('gradoUsuario');

console.log(grado);

if (grado == 2 || grado == 4 || grado == null) {
    listaBotones[0].classList.add('ocultar');
    listaBotones[1].classList.add('ocultar');
    listaBotones[2].classList.add('ocultar');
} else {
    listaBotones[0].classList.remove('ocultar');
    listaBotones[1].classList.remove('ocultar');
}
if(grado == 3 || grado == 4 || grado == null){
    btn_finalizado.classList.add('ocultar')
}else{
    btn_finalizado.classList.remove('ocultar')
}