'use strict';

const express = require('express');
const router = express.Router();
const tipoEvento = require('../models/tipo-evento.model');
const mongoose = require('mongoose');

router.post('/registrar-tipo-evento', function(req, res) {
    let body = req.body;

    let nuevotipoEvento = new tipoEvento({
        nombre: body.nombre,
        estado: body.estado
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

    tipoEvento.find(
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
                    tipoEventos: tipoEventosBD
                });
            }
        }
    );
});


router.post('/modificar-tipoEvento', function(req, res) {
    let body = req.body;

    tipoEvento.updateOne({ _id: body._id }, {
            $set: req.body
        },
        function(err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el tipo de evento',
                    error: err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                });
            }
        }
    );
});


router.post('/modificar-estado-tipoEvento', function(req, res) {

    let body = req.body;

    tipoEvento.updateOne({ _id: body._id }, {
            $set: {
                estado: body.estado
            }
        })
        .then(function(info) {
            res.json({
                resultado: true,
                info: info
            });
        })
        .catch(function(error) {
            res.json({
                resultado: false,
                msg: 'Algo salió mal',
                error
            });
        });

})

router.post('/eliminar-tipoEvento', function(req, res) {

    let body = req.body;

    tipoEvento.deleteOne({ _id: body._id },
            /*{
                       
                   $set: {
                           estado: body.estado
                       }
                       
                   }   */
        )
        .then(function(info) {
            res.json({
                resultado: true,
                info: info
            });
        })
        .catch(function(error) {
            res.json({
                resultado: false,
                msg: 'Algo salió mal',
                error
            });
        });

})


module.exports = router;