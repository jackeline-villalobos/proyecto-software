'use strict';

const express = require('express'),
    router = express.Router(),
    Encargado = require('../models/encargados.model'),
    mongoose = require('mongoose');

router.post('/registrar-usuario', function (req, res) {

    let body = req.body;

    let nuevoEncargado = new Encargado({
        correoElectronico: body.correoElectronico,
        telefono: body.telefono,
        fechaDeNacimiento: body.fechaDeNacimiento,
        nombreCompleto: body.nombreCompleto,
        genero: body.genero,
        contrasenna: body.contrasenna

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


                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'equiponebula2019@gmail.com',
                        pass: 'krashcenfo'
                    }
                });

                let mailOptions = {
                    from: 'Ticket pixel <equiponebula2019@gmail.com>',
                    to: req.body.correoElectronico,
                    subject: 'Primer incio de sesión',
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
                    
                        <h1>Aqui va toda la picha de esa madre</h1>
                        <p>Y el resto de informacion como gracias y bla bla bla</p>
                        <p>Se te solicitará que cambiés tu contraseña temporal por una nueva.</p>
                    
                        <div class="info_credenciales">
                            <p>Tus credenciales de acceso:</p>
                            <div>
                                <span>Nombre de usuario: <span id="nombre_usuario">${req.body.nombreCompleto}</span></span>
                            </div>
                            <div>
                                <span>Contraseña temporal: <span id="contrasena">${req.body.contrasenna}</span></span>
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