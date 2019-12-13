'use strict';


const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    OrganizadorSolicitante = require('../models/organizadorSolicitante.model'),
    mongoose = require('mongoose');


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1',

    }
});

router.post('/registrar-organizadorSolicitante', function (req, res) {

    let body = req.body;

    let nuevo_organizadorSolicitante = new OrganizadorSolicitante({
        nombreEmpresa: body.nombreEmpresa,
        cedulaJuridica: body.cedulaJuridica,
        experiencia: body.experiencia,
        nombreComercial: body.nombreComercial,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        sennas: body.sennas,
        nombreCompleto: body.nombreCompleto,
        correo: body.correo,
        contrasenna: body.contrasenna,
        telefono: body.telefono,
        genero: body.genero,
        grado: '3',
        estado: 'pendiente'
    });
    nuevo_organizadorSolicitante.save(
        function (err, organizadorSolicitanteBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El organizador solicitante no se pudo registrar, ocurrió el siguiente error:',
                    err
                })
            } else {
                let mailOptionsAdmin = {
                    from: 'equiponebula2019@gmail.com',
                    to: 'equiponebula2019@gmail.com',
                    subject: 'Nueva solicitud de organizador',
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
                    
                        <h1>Hay una nueva solicitud de organizador en Ticket Pixel</h1>
                        <h2>A continuación la información para su revisión:</h2>
                    
                        <div class="info_credenciales">
                            <p>Nombre de la empresa: <span> ${nuevo_organizadorSolicitante.nombreEmpresa} </span> </p>
                            <p>Cédula jurídica: <span> ${nuevo_organizadorSolicitante.cedulaJuridica} </span> </p>
                            <p>Años de experiencia: <span> ${nuevo_organizadorSolicitante.experiencia} </span> </p>
                            <p>Nombre Comercial: <span> ${nuevo_organizadorSolicitante.nombreComercial} </span> </p>
                            <p>Provincia: <span> ${nuevo_organizadorSolicitante.provincia} </span> </p>
                            <p>Cantón: <span> ${nuevo_organizadorSolicitante.canton} </span> </p>
                            <p>Distrito: <span> ${nuevo_organizadorSolicitante.distrito} </span> </p>
                            <p>Señas: <span> ${nuevo_organizadorSolicitante.sennas} </span> </p>
                            <p>Nombre completo: <span> ${nuevo_organizadorSolicitante.nombreCompleto} </span> </p>
                            <p>Correo: <span> ${nuevo_organizadorSolicitante.correo} </span> </p>
                            <p>Teléfono: <span> ${nuevo_organizadorSolicitante.telefono} </span> </p>
                            <p>Género: <span> ${nuevo_organizadorSolicitante.genero} </span> </p>
                        </div>
                        <h2>Proceder con la aprobación/reprobación del usuario:</h2>
                        <a href="http://127.0.0.1:5503/listar-organizadores.html">
                        <h2>Organizadores</h2>
                        </a>
                    </body>
                    
                    </html>`
                };
                transporter.sendMail(mailOptionsAdmin, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Solicitud enviada' + info.response);
                    }
                })
                
                res.json({
                    resultado: true,
                    organizadorSolicitanteBD
                });
            }
        });
});

router.get('/listar-organizadorSolicitante', function (req, res) {
    OrganizadorSolicitante.find(function (err, organizadorSolicitanteBD) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'No se encontraron organizadores',
                err
            })
        } else {
            res.json({
                resultado: true,
                organizadores: organizadorSolicitanteBD
            })
        };

    });
});

router.post('/buscar-organizador-id', function (req, res) {
    OrganizadorSolicitante.findById({ _id: req.body._id })
        .then(function (organizadorSolicitanteBD) {
            res.json({
                resultado: true,
                organizador: organizadorSolicitanteBD
            })
        })
});


router.post('/editar-perfil-organizador', function (req, res) {
    let body = req.body;
    OrganizadorSolicitante.updateOne({ _id: body._id }, {
        $set: {
            nombreEmpresa: body.nombreEmpresa,
            cedulaJuridica: body.cedulaJuridica,
            experiencia: body.experiencia,
            nombreComercial: body.nombreComercial,
            provincia: body.provincia,
            canton: body.canton,
            distrito: body.distrito,
            sennas: body.sennas,
            nombreCompleto: body.nombreCompleto,
            correo: body.correo,
            telefono: body.telefono,
            genero: body.genero,
        }
    },
        function (error, info) {
            if(error){
                res.json({
                    resultado: false,
                    msg: 'No se pudo editar el perfil de usuario',
                    err
                })
            }else{
                res.json({
                    resultado:true,
                    info : info
                })
            }
        })
});

router.post('/modificar-estado-organizador', function(req, res) {

    let body = req.body;
    
    OrganizadorSolicitante.updateOne({_id: body._id}, {
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
            msg: 'No se pudo modificar el estado',
            error  
        });
    });

})

router.post('/enviar-correo-confirmacion', function(req, res){
    let body = req.body;

    OrganizadorSolicitante.findOne({_id: body._id})
    .then(function(organizadorSolicitanteBD){
        if(organizadorSolicitanteBD){
            organizadorSolicitanteBD.contrasenna;
            let mailOptions = {
                from : 'equiponebula2019@gmail.com',
                to : organizadorSolicitanteBD.correo,
                subject : 'Bienvido a Ticket pixel',
                html : `<!DOCTYPE html>
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
                        <p>Saludos ${organizadorSolicitanteBD.nombreCompleto}:</p>
                        <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                        <br>
                        <p>Correo electrónico asociado: <span>${organizadorSolicitanteBD.correo} </span> </p>
                        <p>Su contraseña temporal es:  <span> ${organizadorSolicitanteBD.contrasenna} </span></p>
                    </div>
                    <br>
                    <br>
                    <hr>
                    <p class="footer">Este mensaje se envió a ${organizadorSolicitanteBD.correo}</p>
                    <p class="footer">Equipo Nebula, Cenfotec 2019 </p>

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
                usuario: organizadorSolicitanteBD
            })
        }
    })
    
    
});

router.post('/enviar-correo-rechazo', function(req, res){
    let body = req.body;

    OrganizadorSolicitante.findOne({_id: body._id})
    .then(function(organizadorSolicitanteBD){
        if(organizadorSolicitanteBD){
            let mailOptions = {
                from : 'equiponebula2019@gmail.com',
                to : organizadorSolicitanteBD.correo,
                subject : 'Su solicitud ha sido de organizador ha sido rechazada',
                html : `<!DOCTYPE html>
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

                    </style>

                    <title>Cuerpo del correo</title>
                </head>

                <body>

                    <div>
                        <img src="https://res-console.cloudinary.com/proyecto1-nebula/thumbnails/v1/image/upload/v1573759788/dWdrZ3dwbWFyZ2dqZ2l6OWVoeW0=/preview" style="height: 75px; margin-left: 25px; padding-top: 10px;" >
                        <h1>Ticket pixel</h1>
                        <h4>La mejor manera de comprar entradas en linea</h4>
                    </div>
                    <hr>



                    <div class="info_credenciales">
                        <p>Saludos ${organizadorSolicitanteBD.nombreCompleto}:</p>
                        <p>Su solicitud ha sido revisada y lamentablemente no fue aprobada.</p>
                        <br>
                        <p>Estaremos felices de atenderle si necesita más información.</p>
                    </div>
                    <br>
                    <br>
                    <hr>
                    <p class="footer">Este mensaje se envió a ${organizadorSolicitanteBD.correo}</p>
                    <p class="footer">Equipo Nebula, Cenfotec 2019 </p>

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
                usuario: organizadorSolicitanteBD
            })
        }
    })
    
    
});

module.exports = router;