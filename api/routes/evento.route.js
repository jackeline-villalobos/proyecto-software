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
router.post('/agregar-fecha', function (req, res) {
     Evento.update({ _id: req.body._id }, {
         $push: {
             'fechas': {
                 fecha : req.body.fecha,
                 hora : req.body.hora,
             }
     }
   },
     function (error) {
         if (error) {
             res.json({
                 resultado: false,
                 msg: 'La fecha no se pudo registrar',
             });
         } else {
             res.json({
                 resultado: true,
                 msg: 'Se agregó correctamente la fecha'
             });
         }
     }
 )
 });

module.exports = router;