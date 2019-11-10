'use strict';
const mongoose = require('mongoose');

const tipoEventoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },

});

module.exports = mongoose.model('tipoEvento', tipoEventoSchema, 'tipoEventos');