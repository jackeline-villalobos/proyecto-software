'use strict';

const nodeMailer = require('nodemailer')

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/cambiar-contrasenna', function(req, res) {

    let body = req.body;
    let usuarios = usuarios.req.body;

    // let usuario = new Usuario({

    //     primerNombre: body.primerNombre,
    //     segundoNombre: body.segundoNombre,
    //     primerApellido: body.primerApellido,
    //     segundoApellido: body.segundoApellido,
    //     correo: body.correo,
    //     fechaDeNacimiento: body.fechaDeNacimiento,
    //     genero: body.genero,
    //     provincia: body.provincia,
    //     canton: body.canton,
    //     distrito: body.distrito,
    //     direccion: body.direccion,
    //     contrasenna: body.contrasenna,
    //     estado: "activo",
    //     imagen: req.body.imagen,
    //     grado: '4'

    // });

    usuarios.forEach(function(item) {
        item.contrasenna = inputContrasennaNueva.value;
    })

    usuarios.save(
        function(err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo cambiar su contrasenna, ocurrió el siguiente error',
                    err
                });
            } else {

                let mailOptions = {
                    from: 'equiponebula2019@gmail.com',
                    to: usuarios.contrasenna,
                    subject: 'Cambio de contraseña',
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
                        </style>
                    
                        <title>Cuerpo del correo</title>
                    </head>
                    
                    <body>
                    
                        <h1>Ticket Pixel</h1>
                        <h2>Cambio de contraseña</h2>

                        <span>          Su código de seguridad es:              ${generarCodigoSeguridad}            </span>
                    
                        <div class="info_credenciales">
                            <p>Saludos ${usuarios.nombre} le agradecemos por escoger los sevicios de Ticket pixel</p>
                            <p>Correo electrónico asociado: <span> ${usuarios.correo} </span> </p>
                            <p>Su contraseña temporal es:  <span> ${usuarios.contrasenna} </span></p>
                        </div>
                    
                    </body>
                    
                    </html>`
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo enviado con éxito' + info.response);
                    }
                })

                res.json({
                    resultado: true,
                    usuarioBD,
                    msg: 'El usuario se registró con éxito!'
                });

            }
        });
});

module.exports = router;