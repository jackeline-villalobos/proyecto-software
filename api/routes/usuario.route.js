'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    mongoose = require('mongoose');

router.post('/registrar-usuario', function(req, res){

    let body= req.body;

    let nuevo_usuario= new Usuario({
        primerNombre: body.primerNombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        correo: body.correo,
        fechaDeNacimiento: body.fechaDeNacimiento,
        direccion: direccion
    })


})