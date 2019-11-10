'use strict';

const express = require('express');
const router = express.Router();
const tipoEvento = require('../models/tipo-evento.model');
const mongoose = require('mongoose');

router.post('/registrar-tipo-evento', function(req, res) {
    let body = req.body;

    let nuevotipoEvento = new tipoEvento({
        nombre: body.nombre,



    });
    nuevotipoEvento.save(
        function(err, tipoEventoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El tipo de evento no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    tipoEventoBD
                });
            }
        });

});

router.get('/listar-tipo-evento', function(req, res) {

    Impuesto.find(
        function(err, tipoEventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    impuestos: tipoEventosBD
                });
            }
        }
    );
});

module.exports = router;