'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    mongoose = require('mongoose');

router.post('/registrar-evento', function (req, res) {
    let body = req.body;

    let nuevoEvento = new Evento({
        nombre: body.nombre,
        tipoDeEventos: body.tipoDeEventos,
        pais: body.pais,
        lugar: body.lugar,
        cantidadAsistentes: body.cantidadAsistentes,
        fecha: body.fecha,
        hora: body.hora,
        precioEntrada: body.precioEntrada,
        descripcion: body.descripcion,
        impuestos: body.impuestos,
        imagen: body.imagen,
        estado: 'activo'
    });

    nuevoEvento.save(
        function (err, eventoBD) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El evento no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    eventoBD
                });
            }

        });

});

module.exports = router;