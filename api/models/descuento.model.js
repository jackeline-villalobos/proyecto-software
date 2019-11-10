'use strict';

const mongoose = require('mongoose');

const descuentoSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique:true},
    porcentaje: {type: Number, required: true},
    estado: {type: String, required: true}
});

module.exports = mongoose.model('Descuento', descuentoSchema, 'descuentos');