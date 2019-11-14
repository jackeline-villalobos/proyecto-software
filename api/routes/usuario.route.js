'use strict';

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    mongoose = require('mongoose');

router.post('/registrar-usuario', function(req, res) {

    let body = req.body;

    let nuevoUsuario = new Usuario({
        primerNombre: body.primerNombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        correo: body.correo,
        fechaDeNacimiento: body.fechaDeNacimiento,
        genero: body.genero,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion: body.direccion,
        estado: "activo"
    });

    nuevoUsuario.save(
        function(err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El tipo de evento no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    usuarioBD
                });
            }
        });
});



module.exports = router;
