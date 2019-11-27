'use strict';

const mongoose = require('mongoose');
const organizadorSolicitante_schema = new mongoose.Schema(
    {
        nombreEmpresa : {type : String, required: true},
        cedulaJuridica : {type : String, required: true},
        experiencia : {type : Number, required: true},
        nombreComercial : {type : String, required: true},
        provincia : {type : String, required: true},
        canton : {type : String, required: true},
        distrito : {type : String, required: true},
        sennas : {type : String, required: true},
        nombreCompleto : {type : String, required: true},
        correo : {type : String, required: true, unique:true},
        contrasenna: {type: String, required: true, unique: false},
        telefono : {type : String, required: true},
        genero : {type : String, required: true},
        grado: {type: String, required: false, unique: false},
        estado : {type : String, required: true},

    }
);

module.exports = mongoose.model('OrganizadorSolicitante', organizadorSolicitante_schema, 'organizadorSolicitantes');