'use strict';
const mongoose = require ('mongoose');

const impuestoSchema = new mongoose.Schema(
    {
        nombre: {type: String, required: true, unique: true},
        porcentaje: {type: Number, required: true},
        estado: {type: String, required: true}
    }
);

module.exports = mongoose.model('Impuesto', impuestoSchema, 'impuestos');