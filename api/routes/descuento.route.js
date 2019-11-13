'use strict';

const express = require('express');
const router = express.Router();
const Descuento = require('../models/descuento.model');
const mongoose = require('mongoose');

router.post('/registrar-descuento', function(req, res) {
    let body = req.body;

    let nuevoDescuento = new Descuento({
      nombre : body.nombre,
      porcentaje: body.porcentaje,
      estado: 'activo'  
    });
    nuevoDescuento.save(function(err, descuentoBD){
        if(err){
            res.json({
                resultado: false,
                msg: 'El descuento no se pudo registrar, ocurrió el siguiente error',
                err
            });
        } else {
            res.json({
                resultado: true,
                descuentoBD
            });
        }
    });
});

router.get('/listar-descuentos', function(req, res) {

   Descuento.find(
       function(err, descuentosBD){
           if(err){
               res.json({
                    resultado: false,
                    msg: 'No se encontraron descuentos',
                    err
               });
           } else {
               res.json({
                   resultado: true,
                   descuentos: descuentosBD
               });
           }
       }
   );
});

module.exports = router;