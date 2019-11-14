'use strict';

const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(

    {
        nombre: { type: String, required: true, unique: false }, 
        fecha: { type: Date, required: true, unique: false },
        tipo_de_eventos: { type: String, required: true, unique: false }, // Variables en camelCase
        lugar: { type: String, required: true, unique: false },
        hora: { type: String, required: true, unique: false },
        descripcion: { type: String, required: true, unique: false },
        imagen : {type: String, required: true},
        estado: { type: String, required: true, unique: false }
    }

);

module.exports = mongoose.model('Evento', eventoSchema, 'eventos');