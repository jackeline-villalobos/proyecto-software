'use strict';

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    mongoose = require('mongoose');

router.post('/registrar-usuario', function(req, res) {

    let body = req.body;

    let nuevoUsuario = new Usuario({
        primerNombre: body.primerNombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        correo: body.correo,
        fechaDeNacimiento: body.fechaDeNacimiento,
        genero: body.genero,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion: body.direccion,
        imagen: req.body.imagen,
        estado: "activo"
        //contrasenna: "abc"
        
    });

    nuevoUsuario.save(
        function(err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    usuarioBD
                });
            }
        });
});


router.get('/listar-usuarios',function(req, res) {
    Usuario.find(function(err,usuariosBD){
        if(err){
            res.json({
                resultado: false,
                msg: 'No se encontraron usuarios',
                err
            })
        } else {
            res.json({
                resultado: true,
                usuariosBD  
            })
        };

    });
});


router.post('/agregar-tarjeta', function(req, res){
    Usuario.update({_id: req.body._id}, {
        $push: {
            'tarjeta': {
                marca: req.body.marca ,
                numero: req.body.numero ,
                fechaExpiracion: req.body.fechaExpiracion ,
                codigoSeguridad: req.body.codigoSeguridad
            }
        }        
    }, function (err) {
        if(err) {
            return res.json({
                resultado: false,
                msg: 'No se puso agregar la tarjeta',
                err                              
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó la tarjeta correctamente'
            });
        }
    }
    )
});


module.exports = router;
