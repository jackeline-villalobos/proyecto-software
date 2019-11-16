'use strict';

const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(

    {
        nombre: { type: String, required: true, unique: false },
        tipoDeEventos: { type: String, required: true, unique: false },
        pais: { type: String, required: true, unique: false },
        lugar: { type: String, required: true, unique: false },
        cantidadAsistentes: { type: String, required: true, unique: false },
        fechas: [
                {
                 fecha : {type: String, required: true, unique: false},
                 hora : {type: String, required: true, unique: false},
                }
            ],
        precioEntrada: { type: String, required: true, unique: false },
        descripcion: { type: String, required: true, unique: false },
        impuestos: { type: String, required: true, unique: false },
        imagen : {type: String, required: true},
        estado: { type: String, required: true, unique: false }
    }

);

module.exports = mongoose.model('Evento', eventoSchema, 'eventos');