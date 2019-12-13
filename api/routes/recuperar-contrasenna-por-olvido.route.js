
'use strict';

const nodeMailer = require('nodemailer')

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    Empresa = require('../models/empresa.model'),
    Encargado = require('../models/encargados.model'),
    mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/recuperar-contrasenna-por-olvido', function (req, res) {

    let body = req.body;

    let contrasenna = Usuario.contrasenna;

    contrasenna.save(
        function (err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La contraseña no se pudo enviar, ocurrió el siguiente error',
                    err
                });
            } else {

                let mailOptions = {
                    from: 'equiponebula2019@gmail.com',
                    to: nuevoUsuario.correo,
                    subject: 'Bienvido a Ticket pixel',
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
                    
                        <h1>Bienvenido a Ticket pixel</h1>
                        <h2>La mejor manera de comprar entradas en linea</h2>
                    
                        <div class="info_credenciales">
                            <p>Saludos. Le agradecemos por escoger utilizar los sevicios de Ticket pixel</p>
                            <p>Su contraseña es:  <span> ${Usuario.contrasenna} </span></p>
                        </div>
                    
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

                res.json({
                    resultado: true,
                    usuarioBD,
                    msg: '¡La contraseña fue enviada con éxito!'
                });

            }
        }
        );
});


router.post('/iniciar-sesion', function (req, res) {
    Usuario.findOne({ correo: req.body.correo })
        .then(function (usuarioBD) {
            if (usuarioBD) {
                // if (usuarioBD.contrasenna == req.body.contrasenna) {
                //     res.json({
                //         resultado: true,
                //         usuario: usuarioBD
                //     });
                // } else {
                    Empresa.findOne({ correo: req.body.correo })
                        .then(function (empresaBD) {
                            if (empresaBD) {
                                if (empresaBD.contrasenna == req.body.contrasenna) {
                                    res.json({
                                        resultado: true,
                                        usuario: empresaBD
                                    });
                                } else {
                                    Encargado.findOne({ correo: req.body.correo })
                                        .then(function (encargadoBD) {
                                            if (encargadoBD) {
                                                if (encargadoBD.contrasenna == req.body.contrasenna) {
                                                    res.json({
                                                        resultado: true,
                                                        usuario: encargadoBD
                                                    });
                                                }
                                            } else {
                                                res.json({
                                                    resultado: false,
                                                    msg: 'No se encontraron usuarios'
                                                });
                                            }
                                        });
                                }
                            }
                        });
                // }
            }
        });
});




// router.get('/listar-usuarios', function (req, res) {
//     Usuario.find(function (err, usuariosBD) {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msg: 'No se encontraron usuarios',
//                 err
//             })
//         } else {
//             res.json({
//                 resultado: true,
//                 usuarios: usuariosBD
//             })
//         };

//     });
// });


// router.post('/agregar-tarjeta', function (req, res) {
//     Usuario.update({ _id: req.body._id }, {
//         $push: {
//             'tarjeta': {
//                 marca: req.body.marca,
//                 numero: req.body.numero,
//                 fechaExpiracion: req.body.fechaExpiracion,
//                 codigoSeguridad: req.body.codigoSeguridad
//             }
//         }
//     }, function (err) {
//         if (err) {
//             return res.json({
//                 resultado: false,
//                 msg: 'No se pudo agregar la tarjeta',
//                 err
//             });
//         } else {
//             return res.json({
//                 resultado: true,
//                 msg: 'Se agregó la tarjeta correctamente'
//             });
//         }
//     }
//     )
// });


module.exports = router;
