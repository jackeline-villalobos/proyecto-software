'use strict';

const nodeMailer = require('nodemailer')
const express = require('express'),
router = express.Router(),
Encargado = require('../models/encargados.model'),
mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/registrar-encargado', function (req, res) {

    let body = req.body;

    let nuevoEncargado = new Encargado({
        correo: body.correo,
        telefono: body.telefono,
        nombreCompleto: body.nombreCompleto,
        fechaDeNacimiento: body.fechaDeNacimiento,
        genero: body.genero,
        contrasenna: body.contrasenna,
        grado: '2'
    });

    nuevoEncargado.save(
        function (err, encargadoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El encargado no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    encargadoBD,
                    msg: 'El encargado se registró con éxito!'
                });

                let mailOptions = {
                    from: 'Ticket pixel <equiponebula2019@gmail.com>',
                    to: req.body.correo,
                    subject: 'Registro de encargado',
                    html: `
                    <!DOCTYPE html>
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
                            }
                    
                            p {
                                margin-bottom: 5px;
                                text-align: justify;
                            }
                        </style>
                    
                        <title>Cuerpo del correo</title>
                    </head>
                    
                    <body>
                    
                    <h1>Bienvenido a Ticket pixel</h1>
                    <p>Se ha registrado con exito!</p>
                    <p></p>
                    
                        <div class="info_credenciales">
                            <p>Credenciales de acceso:</p>
                            <div>
                                <span>Correo: <span id="nombre_usuario">${req.body.correo}</span></span>
                            </div>
                            
                            <div>
                                <span>Contraseña: <span id="contrasena">${req.body.contrasenna}</span></span>
                            </div>
                        </div>
                    
                    </body>
                    
                    </html>
                    `

                };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                } else {
                    console.log('El correo se envió correctamente');
                }
            });


        }
    });
});

router.post('/agregar-recinto', function(req, res){
    Encargado.update({ _id: req.body._id}, {
        $push: {
            'recinto': {
                nombreRecinto: req.body.nombreRecinto
            }
        }
    }, function(err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'Se ha enviado un correo al ',
                err
            });
        } else {
            return res,json({
                resultado: true,
                msg: 'El recinto se ha asociado correctamente',
            });           
        }
    }
    )
})

module.exports = router;