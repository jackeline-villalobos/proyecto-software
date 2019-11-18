'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    mongoose = require('mongoose');

router.post('/registrar-evento', function (req, res) {
    let body = req.body;

    let nuevoEvento = new Evento({
        nombre: body.nombre,
        tipoDeEventos: body.tipoDeEventos,
        pais: body.pais,
        lugar: body.lugar,
        cantidadAsistentes: body.cantidadAsistentes,
        precioEntrada: body.precioEntrada,
        descripcion: body.descripcion,
        impuestos: body.impuestos,
        imagen: body.imagen,
        estado: 'activo'
    });

    nuevoEvento.save(
        function (err, eventoBD) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El evento no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    eventoBD
                });
            }

        });

});
router.post('/agregar-fecha', function (req, res) {
    
    if (req.body._id) {
        Evento.update({ _id: req.body._id }, {
            $push: {
                'fechas': {
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                }
            }
        },
            function (error) {
                if (error) {
                    return res.json({
                        resultado: false,
                        msg: 'La fecha no se pudo registrar',
                    });
                } else {
                    return res.json({
                        resultado: true,
                        msg: 'Se agregó correctamente la fecha'
                    });
                }
            }
        )
    }else{
        return res.json({
            success: false,
            msj: 'No se pudo agregar la fecha, por favor verifique que el _id sea correcto'

        });
    }

});
router.get('/listar-eventos', function(req, res){

    Evento.find(
        function(err, eventosBD){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'No se encontraron eventos',
                    err
                })
            }else{
                res.json({
                    resultado: true,
                    eventos: eventosBD
                })
            }
        }
    );

});
router.post('/agregar-descuento', function(req, res){
    Evento.update({_id: req.body._id}, {
       $push: {
        'descuentos': {
            nombre: req.body.nombre,
            porcentaje: req.body.porcentaje
        }
       } 
    }, function(err){
        if(err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo agregar el descuento',
                err 
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó el descuento correctamente'
            });
        }
    });
});

module.exports = router;