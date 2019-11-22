'use strict';

const mongoose = require('mongoose');

const contrasennaSchema = new mongoose.Schema(
    {

    
    correo: { type: String, required: true, unique: true },
    
    contrasenna: {type: String, required: true, unique: false},
    
}
);

module.exports = mongoose.model('Usuario', contrasennaSchema, 'usuarios');