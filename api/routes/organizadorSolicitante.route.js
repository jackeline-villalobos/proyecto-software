'use strict';

const express = require('express'),
    router = express.Router(),
    OrganizadorSolicitante = require('../models/organizadorSolicitante.model'),
    mongoose = require('mongoose');

router.post('/registrar-organizadorSolicitante', function(req, res){

    let body = req.body;

    let nuevo_organizadorSolicitante = new OrganizadorSolicitante({
        nombreEmpresa : body.nombreEmpresa,
        cedulaJuridica : body.cedulaJuridica,
        experiencia : body.experiencia,
        nombreComercial : body.nombreComercial,
        provincia : body.provincia,
        canton : body.canton,
        distrito : body.distrito,
        sennas : body.sennas,
        nombreCompleto : body.nombreCompleto,
        correo : body.correo,
        telefono : body.telefono,
        genero : body.genero,
        estado :'activo'
    });
    nuevo_organizadorSolicitante.save(
        function(err, organizadorSolicitanteBD){
            if(err){
                res.json({
                    resultado: false,
                    msg : 'El organizador solicitante no se pudo registrar, ocurrió el siguiente error:',
                    err
                })
            }else{
                res.json({
                    resultado: true,
                    organizadorSolicitanteBD
                })
            }
        });
});
module.exports = router;