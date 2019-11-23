'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    Recinto = require('../models/recinto.model'),
    Impuesto = require('../models/impuesto.model'),
    mongoose = require('mongoose');

router.post('/registrar-evento', function (req, res) {
    let body = req.body;

    let nuevoEvento = new Evento({
        nombre: body.nombre,
        tipoDeEventos: body.tipoDeEventos,
        pais: body.pais,
        lugar: body.lugar,
        precioEntrada: body.precioEntrada,
        descripcion: body.descripcion,
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
                    cantidadAsistentes: body.cantidadAsistentes,
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

// router.post('/agregar-descuento', function(req, res){
//     Evento.update({_id: req.body._id}, {
//        $push: {
//         'descuentos': {
//             nombre: req.body.nombre,
//         }
//        } 
//     }, function(err){
//         if(err) {
//             return res.json({
//                 resultado: false,
//                 msg: 'No se pudo agregar el descuento',
//                 err 
//             });
//         } else {
//             return res.json({
//                 resultado: true,
//                 msg: 'Se agregó el descuento correctamente'
//             });
//         }
//     });
// });

// router.post('/agregar-impuesto', function(req, res){
//     Evento.update({_id: req.body._id}, {
//        $push: {
//         'impuestos': {
//             nombre: req.body.nombre,
//         }
//        } 
//     }, function(err){
//         if(err) {
//             return res.json({
//                 resultado: false,
//                 msg: 'No se pudo agregar el impuesto',
//                 err 
//             });
//         } else {
//             return res.json({
//                 resultado: true,
//                 msg: 'Se agregó el impuesto correctamente'
//             });
//         }
//     });
// });

router.get('/listar-eventos', function(req, res){

    Evento.find(
        function(err, eventoBD){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'No se encontraron eventos',
                    err
                })
            }else{
                res.json({
                    resultado: true,
                    eventos: eventoBD
                })
            }
        }
    );

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

router.get('/listar-tipo-evento', function(req, res) {

    tipoEvento.find(
        function(err, tipoEventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    tipoEventos: tipoEventosBD
                });
            }
        }
    );
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

module.exports = router;