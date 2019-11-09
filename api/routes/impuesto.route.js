'use strict';

const express = require('express');
const router = express.Router();
const Impuesto = require('../models/impuesto.model');
const mongoose = require('mongoose');

router.post('/registrar-impuesto', function(req, res) {
    let body = req.body;

    let nuevoImpuesto = new Impuesto({
        nombre: body.nombre,
        porcentaje: body.porcentaje,
        estado: 'activo'
        

    });
    nuevoImpuesto.save(
        function(err, impuestoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El impuesto no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    impuestoBD
                });
            }
        });
        
});

router.get('/listar-impuestos', function(req, res) {

    Impuesto.find(
        function(err, impuestosBD){
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron impuestos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    impuestos: impuestosBD
                });
            }
        }
    );
});

module.exports = router;