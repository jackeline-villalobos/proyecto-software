"use strict";

const express = require("express"),
    router = express.Router(),
    Recinto = require('../models/recinto.model'),
    mongoose = require('mongoose');

router.post('/registrar-recinto', function(req, res) {
    let body = req.body;

    let nuevoRecinto = new Recinto({
        nombreRecinto: body.nombreRecinto,
        capacidad: body.capacidad,
        capacidadDiscapacitados: body.capacidadDiscapacitados,

        direccion: body.direccion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,

        estado: "activo"
    });

    nuevoRecinto.save(
        function(err, recintoDB) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: "El recinto no se pudo registrar. Ocurrió el siguiente error: ",
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    recintoDB
                });
            }
        });
});
module.exports = router;