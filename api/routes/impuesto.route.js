'use strict';

const express = require('express');
const router = express.Router();
const Impuesto = require('../models/impuesto.model');
const mongoose = require('mongoose');

router.post('/registrar-impuesto', function (req, res) {
    let body = req.body;

    let nuevoImpuesto = new Impuesto({
        nombre: body.nombre,
        porcentaje: body.porcentaje,
        estado: 'activo'


    });
    nuevoImpuesto.save(
        function (err, impuestoBD) {
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

router.get('/listar-impuestos', function (req, res) {

    Impuesto.find(
        function (err, impuestosBD) {
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

router.get('/buscar-impuesto-id/:_id', function (req, res) {
    let _id = req.params._id;

    Impuesto.findById({ _id: _id }, function (err, impuestoBD) {
        if (err) {
            res.json({
                resultado: false,
                err
            });
        } else {
            res.json({
                resultado: true,
                impuesto: impuestoBD
            });
        }
    });
});

router.post('/modificar-impuesto', function (req, res) {
    let body = req.body;

    Impuesto.updateOne({ _id: body._id }, {
        $set: req.body
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el impuesto',
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


router.post('/modificar-estado-impuesto', function(req, res) {

    let body = req.body;

    Impuesto.updateOne({_id: body._id}, {
      $set: {
          estado: body.estado
      }  
    })
    .then(function(info){
        res.json({
            resultado: true,
            info: info
        });
    })
    .catch(function(err){
        res.json({
            resultado: false,
            error: err
        });
    });

});

router.post('/eliminar-impuesto', function(req, res) {

    let body = req.body;

    Impuesto.deleteOne({_id: body._id})
    .then(function(info){
        res.json({
            resultado: true,
            info: info
        });
    })
    .catch(function(err){
        res.json({
            resultado: false,
            error: err
        });
    });

});


module.exports = router;