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



// Validar si un string es conformado de solo numeros
let z1 = /^[0-9]*$/; // 0 o mas
let z2 = /^[0-9]+$/; // 1 o mas

if (!z2.test(input_capacidad.value)) {
    error = true;
    input_capacidad.classList.add("error");
} else {
    input_capacidad.classList.remove("error");
}

if (!z1.test(input_capacidadDiscapacitado.value)) {
    error = true;
    input_capacidadDiscapacitado.classList.add("error");
} else {
    input_capacidadDiscapacitado.classList.remove("error");
}

//FIN validar numeros