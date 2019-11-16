'use strict';

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    mongoose = require('mongoose');

router.post('/registrar-usuario', function (req, res) {

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
        contrasenna: body.contrasenna,
        estado: "activo",
        imagen: req.body.imagen

    });

    nuevoUsuario.save(
        function (err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    usuarioBD,
                    msg: 'El usuario se registró con éxito!'
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
                    to: req.body.correo,
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
                                <span>Nombre de usuario: <span id="nombre_usuario">${req.body.primerNombre}</span></span>
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


router.get('/listar-usuarios', function (req, res) {
    Usuario.find(function (err, usuariosBD) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'No se encontraron usuarios',
                err
            })
        } else {
            res.json({
                resultado: true,
                usuarios: usuariosBD
            })
        };

    });
});


router.post('/tipo-tarjeta', function (req, res) {
    let numeroTarjeta = req.body.numero;

    let marca;

    let tarjetaAmericanExpress = (numeroTarjeta) => {
        let numero = /^(?:3[47][0-9]{13})$/;

        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }


    let tarjetaVisa = (numeroTarjeta) => {
        let numero = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }
    }

    let tarjetaMasterCard = (numeroTarjeta) => {
        let numero = /^(?:5[1-5][0-9]{14})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }
    }

    let tarjetaDiscover = (numeroTarjeta) => {
        let numero = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    let tarjetaDinnersClub = (numeroTarjeta) => {
        let numero = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    let tarjetaJCB = (numeroTarjeta) => {
        let numero = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
        if (numeroTarjeta.match(numero)) {
            return true;
        } else {
            return false;
        }

    }

    if (tarjetaAmericanExpress(numeroTarjeta)) {
        marca = 'American Express';
    }

    if (tarjetaVisa(numeroTarjeta)) {
        marca = 'Visa';
    }

    if (tarjetaMasterCard(numeroTarjeta)) {
        marca = 'MasterCard';
    }

    if (tarjetaDiscover(numeroTarjeta)) {
        marca = 'Discover';
    }

    if (tarjetaDinnersClub(numeroTarjeta)) {
        marca = 'Dinners Club';
    }

    if (tarjetaJCB(numeroTarjeta)) {
        marca = 'JCB';
    }

    res.send({
        msg: 'Validación correcta, la marca es',
        marca
    });

});


router.post('/agregar-tarjeta', function (req, res) {
    Usuario.update({ _id: req.body._id }, {
        $push: {
            'tarjeta': {
                marca: req.body.marca,
                numero: req.body.numero,
                fechaExpiracion: req.body.fechaExpiracion,
                codigoSeguridad: req.body.codigoSeguridad
            }
        }
    }, function (err) {
        if (err) {
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
