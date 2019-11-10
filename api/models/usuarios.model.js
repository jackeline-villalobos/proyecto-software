'use strict';

const mongoose = require('mongoose');
const registrar_usuario = new mongoose.Schema(
    {
        primerNombre: {type: String, required: true, unique: false},
        segundoNombre: {type: String, required: false, unique: false},
        primerApellido: {type: String, required: true, unique: false},
        segundoApellido: {type: String, required: false, unique: false},
        correo: {type: String, required: true, unique: true},
        fechaDeNacimiento: {type: Date, required: true, unique: false},
        genero: {type: String, required: true, unique: false}
    });

module.exports = mongoose.model('Usuario', registrar_usuario, 'usuarios');