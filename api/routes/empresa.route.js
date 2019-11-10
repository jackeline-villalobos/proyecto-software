"use strict";

const express = require("express"),
    router = express.Router(),
    Empresa = require('../models/empresa.model'),
    mongoose = require('mongoose');

router.post('/registrar-empresa', function(req, res) {
    let body = req.body;

    let nuevoEmpresa = new Empresa({
        nombreEmpresa: body.nombreEmpresa,
        razonSocial: body.razonSocial,
        cedulaJuridica: body.cedulaJuridica,
        telefono: body.telefono,
        direccion: body.direccion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,

        estado: "activo"
    });

    nuevoEmpresa.save(
        function(err, empresaDB) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: "La empresa no se pudo registrar. Ocurrió el siguiente error: ",
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    empresaDB
                });
            }
        });
});
module.exports = router;