'use strict';

const mongoose = require('mongoose');

const encargadoSchema = new mongoose.Schema({

    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: false },
    nombreCompleto: { type: String, required: false, unique: false },
    fechaDeNacimiento: { type: Date, required: true, unique: false },
    genero: { type: String, required: true, unique: false },
    contrasenna: { type: String, required: true, unique: true },
    recintos:[
        {
            nombreRecinto: {type: String, required: true, unique: false},
        }
    ],
    grado: {type: String, required: false, unique: false}

});

module.exports = mongoose.model('Encargado', encargadoSchema, 'encargados');