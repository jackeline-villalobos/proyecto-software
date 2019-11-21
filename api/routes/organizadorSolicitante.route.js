'use strict';


const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    OrganizadorSolicitante = require('../models/organizadorSolicitante.model'),
    mongoose = require('mongoose');
    

    const transporter = nodeMailer.createTransport({
        service : 'gmail',
        auth :{
            user : 'equiponebula2019@gmail.com',
            pass : 'krashcenfo',

        }
    });

router.post('/registrar-organizadorSolicitante', function(req, res){

    let body = req.body;

    let nuevo_organizadorSolicitante = new OrganizadorSolicitante({
        nombreEmpresa : body.nombreEmpresa,
        cedulaJuridica : body.cedulaJuridica,
        experiencia : body.experiencia,
        nombreComercial : body.nombreComercial,
        provincia : body.provincia,
        canton : body.canton,
        distrito : body.distrito,
        sennas : body.sennas,
        nombreCompleto : body.nombreCompleto,
        correo : body.correo,
        telefono : body.telefono,
        genero : body.genero,
        estado :'inactivo'
    });
    nuevo_organizadorSolicitante.save(
        function(err, organizadorSolicitanteBD){
            if(err){
                res.json({
                    resultado: false,
                    msg : 'El organizador solicitante no se pudo registrar, ocurrió el siguiente error:',
                    err
                })
            }else{
                let mailOptions = {
                    from : 'equiponebula2019@gmail.com',
                    to : 'jackelynnevillalobos@gmail.com',
                    subject : 'Nueva solicitud de organizador',
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
                        <a href="http://localhost:3000/api/listar-organizadores.html"></a>
                    </body>
                    
                    </html>`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
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

router.post('/activar-organizador', function (req, res) {
    OrganizadorSolicitante.update({ _id: req.body._id }, {
        $push: {
            estado :'activo'
        }
    }, function (err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo activar el usuario',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se activó el usuario correctamente'
            });
        }
    }
    )
});

router.post('/desactivar-organizador', function (req, res) {
    OrganizadorSolicitante.update({ _id: req.body._id }, {
        $push: {
            estado :'inactivo'
        }
    }, function (err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo desactivar el usuario',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se desactivó el usuario correctamente'
            });
        }
    }
    )
});

module.exports = router;