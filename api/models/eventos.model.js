'use strict';

const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(

    {
        nombre : {type: String, required : true, unique : true},
        fecha : {type: Date, required : true, unique : false},
        tipo_de_eventos : {type: String, required : true, unique : false},
        lugar : {type: String, required : true, unique : false},
        hora : {type: String, required : true, unique : false},
        descripcion : {type: String, required : true, unique : false},
        estado : {type: String, required : true, unique : false}
    }

);

module.exports = mongoose.model('Evento', eventoSchema, 'eventos');