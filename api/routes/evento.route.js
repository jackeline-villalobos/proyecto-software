'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    mongoose = require('mongoose');

router.post('/registrar-evento', function(req,res){
    let body = req.body;

    let nuevoEvento = new Evento({
        nombre : body.nombre,
        fecha : body.fecha,
        tipo_de_eventos : body.tipo_de_eventos,
        lugar : body.lugar,
        hora : body.hora,
        descripcion : body.descripcion,
        estado : 'activo'
    });

    nuevoEvento.save(
        function(err, eventoBD) {
             
            if(err){
                res.json({
                    resultado : false,
                    msg : 'El evento no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            }else{
                res.json({
                    resultado : true,
                    eventoBD
                });
            }

    });

});
module.exports = router;