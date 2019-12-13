"use strict";

const nodeMailer = require('nodemailer');

const express = require("express"),
    router = express.Router(),
    Recinto = require('../models/recinto.model'),
    Encargado = require('../models/encargados.model'),
    Usuario = require('../models/usuarios.model'),
    organizadorSolicitante = require('../models/organizadorSolicitante.model'),
    Empresa = require('../models/empresa.model'),
    mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/registrar-recinto', function (req, res) {
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
        function (err, recintoDB) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: "El recinto no se pudo registrar. Ocurrió el siguiente error: ",
                    err
                });
            } else {

                Encargado.findOne({ correo: body.correoEncargado })
                    .then(function (encargadoBD) {
                        if (encargadoBD) {
                            console.log('Hay encargado!');
                        } else {
                            console.log('No hay encargado!');

                            let correo = body.correoEncargado;

                            let mailOptions = {
                                

                                from: 'Ticket Pixel',
                                to: req.body.correoEncargado,
                                subject: 'Registro de recinto',
                                html: `<!DOCTYPE html>
                            <html lang="en">
                            
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <style>
                                    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700');
                            
                            
                                    body {
                                        max-width: 500px;
                                        font-family: 'Roboto', sans-serif;
                                        font-size: 14px;
                                        color: #000;
                                        width: 500px;
                                        margin-left: 30%;
                                        margin-top: 5%;
                                    }
                            
                                    h1 {
                                        margin-top: 15px;
                                        margin-bottom: 10px;
                                        font-size: 26px;
                                        text-align: center;
                                    }
                            
                                    p {
                                        margin-bottom: 5px;
                                        text-align: justify;
                                    }
                            
                                    span{
                                        color: #F2610A;
                                    }
                            
                                    h1{
                                        margin-top: -50px;
                                        margin-bottom: -10px;
                                    }
                                    h4{
                                        text-align: center;
                                    }
                            
                                    .footer{
                                        color: #a7a4a4;
                                        margin-bottom: -8px;
                                        font-size: 12px;
                                    }

                                    button {
                                        height: 32px;
                                        width: 62px;
                                        border-radius: 10px;
                                        background-color: #F2610A;
                                        border: none;
                                        color: #FFFFFF;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                    
                                    button:hover, .btn-registrarse:hover {
                                        background-color: #1EBB2D;
                                        border: none;
                                        color: #FFFFFF;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }

                                    a {
                                        text-decoration: none;
                                    }
                            
                                </style>
                            
                                <title>Cuerpo del correo</title>
                            </head>
                            
                            <body>
                            
                                <div>
                                    <img src="https://res-console.cloudinary.com/proyecto1-nebula/thumbnails/v1/image/upload/v1573759788/dWdrZ3dwbWFyZ2dqZ2l6OWVoeW0=/preview" style="height: 75px; margin-left: 25px; padding-top: 10px;" >
                                    <h1>Bienvenido a Ticket pixel</h1>
                                    <h4>La mejor manera de comprar entradas en linea</h4>
                                </div>
                                <hr>
                                
                                
                            
                                <div class="info_credenciales">
                                    <p>Saludos ${req.body.correoEncargado}</p>
                                    <p>Se ha registrado un nuevo recinto en la plataforma asociado a este correo.</p>
                                    <br>
                                    <p>Puede registrarse en la plataforma haciendo click en el botón.</p>
            
                                    <a href="http://127.0.0.1:5503/registrar-encargado.html?correo=${correo}" )">
                                        <button>Registro</button>
                                        
                                    </a>
                                    
                                </div>
                                <br>
                                <br>
                                <hr>
                                <p class="footer">Este mensaje se envió a ${req.body.correoEncargado}</p>
                                <p class="footer">Equipo Nebula, Cenfotec 2019 </p>

                            </body>

                            
                            
                            </html>`
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Correo enviado con éxito' + info.response);
                                }
                            })
                        }
                    });

                res.json({
                    resultado: true,
                    recintoDB
                });
            }
        });
});

router.get('/listar-recintos', function (req, res) {
    Recinto.find(function (err, recintosBD) {
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

router.get('/buscar-encargado', function (req, res) {
    Encargado.find(function (err, encargadosBD) {
        if (err) {
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

router.post('/buscar-recinto-id', function (req, res) {
    Recinto.findById({ _id: req.body._id })
        .then(function (recintoBD) {
            res.json({
                resultado: true,
                recinto: recintoBD
            });
        })
});

router.get('/verificar-correo-recinto/:correo', function (req, res) {
    let correo = req.params.correo;

    Usuario.findOne({ correo: correo }, function (err, usuarioBD) {
        if (usuarioBD) {
            res.json({
                resultado: false,
                msg: 'El correo ya está registrado como usuario'
            });
        } else {
            organizadorSolicitante.findOne({ correo: correo }, function (err, organizadorSolicitanteBD) {
                if (organizadorSolicitanteBD) {
                    res.json({
                        resultado: false,
                        msg: 'El correo ya está registrado como organizador'
                    });
                } else {
                    Empresa.findOne({ correo: correo }, function (err, empresaBD) {
                        if (empresaBD) {
                            res.json({
                                resultado: false,
                                msg: 'El correo ya está registrado como empresa'
                            });
                        } else {
                            res.json({
                                resultado: true,
                                msg: 'El correo está disponible'
                            });
                        }
                    });
                }
            });
        }
    });

});

router.post('/modificar-recinto', function (req, res) {

    let body = req.body;

    Recinto.updateOne({_id: body.parametro._id}, {
        $set: 
        body.parametro
        
    })
    .then(function(info){
        res.json({
            resultado: true,
            info: info
        });
    })
    .catch(function(error){
        res.json({
            resultado: false,
            msg: 'Algo salió mal',
            error
        });
    });
});

router.post('/modificar-estado-recinto', function(req, res) {

    let body = req.body;
    
    Recinto.updateOne({_id: body._id}, {
        $set: {
            estado: body.estado
        }
    })
    .then(function(info){
        res.json({
            resultado: true, 
            info: info
        });
    })
    .catch(function(error){
        res.json({
            resultado: false,
            msg: 'Algo salió mal',
            error  
        });
    });

})


module.exports = router;