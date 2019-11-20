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
        correoEncargado: body.correoEncargado,

        direccion: body.direccion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        imagen: body.imagen,

        latitud: body.latitud,
        longitud: body.longitud,

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

router.get('/listar-recintos', function(req, res) {
    Recinto.find(function(err, recintosBD) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'No se encontraron recintos',
                err
            });
        } else {
            res.json({
                resultado: true,
                recintos: recintosBD
            });
        }
    });
});

router.get('/buscar-encargado', function(req, res){
    Encargado.find(function(err, encargadosBD) {
        if(err) {
            res.json({
                resultado: false,
                msg: 'No se encontraron encargados',
                err                
            });
        } else {
           res.json({
                resultado: true,
                encargados: encargadosBD
           });
        }
    });
});

router.post('/buscar-recinto-id', function(req,res){
    Recinto.findById({_id: req.body._id})
    .then(function(recintoBD){
        res.json({
            resultado: true,
            recinto: recintoBD
        });
    })
});


module.exports = router;