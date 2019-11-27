'use strict';

const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema(

    {
        nombreEmpresa: { type: String, required: true, unique: true },
        razonSocial: { type: String, required: true, unique: true },
        cedulaJuridica: { type: Number, required: true, unique: true },
        telefono: { type: String, required: true, unique: false },
        correo: { type: String, required: true, unique: true },
        direccion: { type: String, required: true, unique: false },
        provincia: { type: String, required: true, unique: false },
        canton: { type: String, required: true, unique: false },
        distrito: { type: String, required: true, unique: false },
        imagen: { type: String, required: true, unique: false },
        latitud: { type: Number, required: true, unique: false },
        longitud: { type: Number, required: true, unique: false },
        contrasenna: { type: String, required: true, unique: false},
        grado: { type: Number, required: true, unique: false },

        estado: { type: String, required: true, unique: false }
    }

);

module.exports = mongoose.model('Empresa', empresaSchema, 'empresas');