// Validar un numero de telefono

let validarTelefono = /^[\+]?[0-9]{4}?[-\s\.]?[0-9]{4}$/im;


if (validarTelefono.test(input_telefono.value) == false) {
    error = true;
    input_telefono.classList.add('error');
} else {
    input_telefono.classList.remove('error');
}

// Valida si el campo esta vacio o el numero es mas de 9 caracteres
if (input_telefono.value == "" || input_telefono.value.length > 9 || input_telefono.value == " ") {
    error = true;
    input_telefono.classList.add("error");
} else {
    input_telefono.classList.remove("error");

};
//FIN validar Telefono




//Validar correo electronico
let revisar_correo = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;

if (revisar_correo.test(input_correo.value) == false) {
    error = true;
    input_correo.classList.add('error');
} else {
    input_correo.classList.remove('error');
}
//FIN validar correo