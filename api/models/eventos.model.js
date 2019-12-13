'use strict';

const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(

    {
        nombre: { type: String, required: true, unique: true },
        tipoDeEventos: { type: String, required: true, unique: false },
        pais: { type: String, required: true, unique: false },
        lugar: { type: String, required: true, unique: false },
        fechas: [
            {
                fecha: { type: String, required: true, unique: false },
                hora: { type: String, required: true, unique: false },
                cantidadAsistentes: { type: String, required: true, unique: false },
                entradasTotales: { type: String, required: true, unique: false },
            }
        ],
        precioEntrada: { type: String, required: true, unique: false },
        descripcion: { type: String, required: true, unique: false },
        impuestos: [
            {
                nombreImpuesto: { type: String, required: true, unique: false },
            }
        ],
        imagen: { type: String, required: false },
        descuentos: [
            {
                nombreDescuento: { type: String, required: true, unique: false },
                porcentajeDescuento: { type: Number, required: true, unique: false }
            }
        ],
        creador: { type: String, required: false, unique: false },
        proximo : {type: Boolean, required: true, unique: false},
        estado: { type: String, required: true, unique: false },
        comentarios : [
            {
                fotoUsuario: {type: String, required: true, unique: false},
                nombreUsuario: {type: String, required: true, unique: false},
                comentario: {type: String, required: true, unique: false}
            }
        ],
        calificaciones : [
            {
                idUsuario: {type: String, required: true, unique: false},
                calificacion: {type: String, required: true, unique: false},
            }
        ],
    }

);

module.exports = mongoose.model('Evento', eventoSchema, 'eventos');