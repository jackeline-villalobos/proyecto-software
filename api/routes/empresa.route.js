"use strict";

const nodeMailer = require('nodemailer');

const express = require("express"),
    router = express.Router(),
    Empresa = require('../models/empresa.model'),
    mongoose = require('mongoose');

    const transporter = nodeMailer.createTransport({
        service : 'gmail',
        auth :{
            user : 'equiponebula2019@gmail.com',
            pass : 'krashcenfo1',

        }
    });

router.post('/registrar-empresa', function(req, res) {
    let body = req.body;

    let nuevoEmpresa = new Empresa({
        nombreEmpresa: body.nombreEmpresa,
        razonSocial: body.razonSocial,
        cedulaJuridica: body.cedulaJuridica,
        telefono: body.telefono,
        correo: body.correo,
        direccion: body.direccion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        imagen: body.imagen,
        latitud: body.latitud,
        longitud: body.longitud,
        contrasenna: body.contrasenna,
        grado: "5",

        estado: "activo"
    });

    nuevoEmpresa.save(
        function(err, empresaDB) {

            if (err) {
                res.json({
                    resultado: false,
                    msg: "La empresa no se pudo registrar. Ocurrió el siguiente error: ",
                    err
                });
            } else {

                let mailOptionsAdmin = {
                    from : 'equiponebula2019@gmail.com',
                    to : 'equiponebula2019@gmail.com',
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
                            <p>Nombre de la empresa: <span> ${body.nombreEmpresa} </span> </p>
                            <p>Cédula jurídica: <span> ${body.cedulaJuridica} </span> </p>
                            
                            
                            <p>Provincia: <span> ${body.provincia} </span> </p>
                            <p>Cantón: <span> ${body.canton} </span> </p>
                            <p>Distrito: <span> ${body.distrito} </span> </p>
                            
                            
                            <p>Correo: <span> ${body.correo} </span> </p>
                            <p>Teléfono: <span> ${body.telefono} </span> </p>
                        </div>
                        <h2>Proceder con la aprobación/reprobación del usuario:</h2>
                        <a href="http://localhost:3000/api/listar-organizadores.html"></a>
                    </body>
                    
                    </html>`
                };
                transporter.sendMail(mailOptionsAdmin, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Solicitud enviada' + info.response);
                    }
                })
                let mailOptions = {
                    from : 'equiponebula2019@gmail.com',
                    to : body.correo,
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
                            <p>Saludos ${body.nombreEmpresa}:</p>
                            <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                            <br>
                            <p>Correo electrónico asociado: <span>${body.correo} </span> </p>
                            <p>Su contraseña temporal es:  <span> ${body.contrasenna} </span></p>
                        </div>
                        <br>
                        <br>
                        <hr>
                        <p class="footer">Este mensaje se envió a ${body.correo}</p>
                        <p class="footer">Equipo Nebula, Cenfotec 2019 </p>
                    
                    </body>
                    
                    </html>`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Correo enviado con éxito' + info.response);
                    }
                })
                res.json({
                    resultado: true,
                    empresaDB
                });
            }
        });
});
router.post('/buscar-empresa-id', function(req, res){
    Empresa.findById({_id: req.body._id})
    .then(function(empresaDB){
        res.json({
            resultado: true,
            empresa: empresaDB
        })
    })
});

module.exports = router;