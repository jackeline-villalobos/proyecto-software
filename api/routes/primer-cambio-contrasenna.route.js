'use strict'

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    mongoose = require('mongoose');

router.post('/cambiar-primera-contrasenna', function (req, res) {

    let body = req.body;

    let nuevaContrasenna = new btn_cambiarContrasenna({
        codigo: body.codigo,
        nuevaContrasenna: body.nuevaContrasenna
    });


})