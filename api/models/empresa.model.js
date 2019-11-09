'use strict';

const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema(

    {
        nombre: { type: String, required: true, unique: true },
        razonSocial: { type: String, required: true, unique: true },
        cedulaJuridica: { type: Number, required: true, unique: true },
        telefono: { type: String, required: true, unique: false },
        direccion: { type: String, required: true, unique: false },
        provincia: { type: String, required: true, unique: false },
        canton: { type: String, required: true, unique: false },
        distrito: { type: String, required: true, unique: false },
        estado: { type: String, required: true, unique: false }
    }

);

module.exports = mongoose.model('Empresa', eventoSchema, 'empresas');