'use strict';

const express = require('express'),
    router = express.Router(),
    Evento = require('../models/eventos.model'),
    Recinto = require('../models/recinto.model'),

    Impuesto = require('../models/impuesto.model'),
    tipoEvento = require('../models/tipo-evento.model'),
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
        creador: body.creador,
        proximo: true,
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
                    evento: eventoBD
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
                    cantidadAsistentes: req.body.cantidadAsistentes,
                    entradasTotales: req.body.cantidadAsistentes,
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
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la fecha, por favor verifique que el _id sea correcto'

        });
    }

});

router.post('/agregar-descuento', function (req, res) {
    Evento.update({ _id: req.body._id }, {
        $push: {
            'descuentos': {
                nombreDescuento: req.body.nombreDescuento,
                porcentajeDescuento: req.body.porcentajeDescuento
            }
        }
    }, function (err) {
        if (err) {
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

router.post('/agregar-impuesto', function (req, res) {
    Evento.update({ _id: req.body._id }, {
        $push: {
            'impuestos': {
                nombreImpuesto: req.body.nombreImpuesto
            }
        }
    }, function (err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo agregar el impuesto',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó el impuesto correctamente'
            });
        }
    });
});

router.post('/agregar-comentario', function (req, res) {
    Evento.update({ _id: req.body._id }, {
        $push: {
            'comentarios': {
                fotoUsuario: req.body.fotoUsuario,
                nombreUsuario: req.body.nombreUsuario,
                comentario: req.body.comentario
            }
        }
    }, function (err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo agregar el comentario',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó el comentario correctamente'
            });
        }
    });
});

router.post('/agregar-calificacion', function (req, res) {
    Evento.update({ _id: req.body._id }, {
        $push: {
            'calificaciones': {
                idUsuario: req.body.idUsuario,
                calificacion: req.body.calificacion,
            }
        }
    }, function (err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo agregar la calificación',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó la calificación correctamente'
            });
        }
    });
});

router.post('/editar-evento', function (req, res) {
    let body = req.body;
    Evento.updateOne({ _id: body._id }, {
        $set: {
            tipoDeEventos: body.tipoDeEventos,
            pais: body.pais,
            lugar: body.lugar,
            precioEntrada: body.precioEntrada,
            descripcion: body.descripcion,
            creador: body.creador,
            imagen: body.imagen,
        }
    },
        function (error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo editar el evento',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        })
});

router.get('/listar-eventos', function (req, res) {

    Evento.find(
        function (err, eventoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron eventos',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    eventos: eventoBD
                })
            }
        }
    );

});


router.post('/buscar-evento-id', function (req, res) {
    Evento.findById({ _id: req.body._id })
        .then(function (eventoBD) {
            res.json({
                resultado: true,
                evento: eventoBD
            })
        })
});

router.get('/buscar-recinto-nombre', function (req, res) {

    let nombreRecinto = req.query.nombreRecinto;

    Recinto.find({ nombreRecinto: nombreRecinto }, function (err, recintoBD) {
        if (err) {
            return res.json({
                succes: false,
                msg: 'No se ecnotró ningún Recinto',
                err
            });
        } else {
            return res.json({
                succes: true,
                recinto: recintoBD,
            });
        }
    })
});

router.post('/marcar-finalizado', function (req, res) {
    let body = req.body;
    Evento.updateOne({ _id: body._id }, { $set: { proximo: false } },
        function (error, eventoBD) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    evento: eventoBD,
                })
            }
        })
})


router.get('/buscar-eventos-especificos', function (req, res) {

    let ids = req.params.ids

    Evento.find({
        '_id': {
            $in: ids
        }
    })
        .then(function (eventos) {
            res.json({
                resultado: true,
                eventos: eventos
            });
        })
        .catch(function (err) {
            res.json({
                resultado: false,
                error: err
            })
        })

});

module.exports = router;