'use strict';

const express = require('express');
const router = express.Router();
const usuarioApi = require('./usuarios.api');

router.route('/registrar-usuario')
    .post(function(req, res){
        usuarioApi.registrar(req, res);
    });

router.route('/validar-credenciales')
.post(function(req, res){
    usuarioApi.validar(req, res);
});


module.exports = router;    