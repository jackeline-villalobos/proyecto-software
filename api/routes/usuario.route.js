'use strict';

const nodeMailer = require('nodemailer')

const express = require('express'),
    router = express.Router(),
    Usuario = require('../models/usuarios.model'),
    organizadorSolicitante = require('../models/organizadorSolicitante.model'),
    Empresa = require('../models/empresa.model'),
    Encargado = require('../models/encargados.model'),
    Evento = require('../models/eventos.model'),
    mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/registrar-usuario', function(req, res) {

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
        imagen: req.body.imagen,
        grado: '4',
        baneado: false

    });

    nuevoUsuario.save(
        function(err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar, ocurrió el siguiente error',
                    err
                });
            } else {

                let mailOptions = {
                    from: 'Ticket Pixel',
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
                            <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                            <h1>Bienvenido a Ticket pixel</h1>
                            <h4>La mejor manera de comprar entradas en linea</h4>
                        </div>
                        <hr>
                        
                        
                    
                        <div class="info_credenciales">
                            <p>Saludos ${nuevoUsuario.primerNombre}:</p>
                            <p>Puedes ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                            <br>
                            <p>Correo electrónico asociado: <span>${nuevoUsuario.correo} </span> </p>
                            <p>Su contraseña temporal es:  <span> ${nuevoUsuario.contrasenna} </span></p>
                        </div>
                        <br>
                        <br>
                        <hr>
                        <p class="footer">Este mensaje se envió a ${nuevoUsuario.correo}</p>
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
                    usuarioBD,
                    msg: 'El usuario se registró con éxito!'
                });

            }
        });
});


router.post('/iniciar-sesion', function(req, res) {


    Usuario.findOne({ correo: req.body.correo })
        .then(function(usuarioBD) {
            if (usuarioBD) {
                if (usuarioBD.contrasenna == req.body.contrasenna) {
                    res.json({
                        resultado: true,
                        usuario: usuarioBD
                    });
                } else {
                    res.json({
                        resultado: false,
                        msg: 'La contraseña no coincide usuario'
                    });
                }
            } else {
                organizadorSolicitante.findOne({ correo: req.body.correo })
                    .then(function(organizadorSolicitanteBD) {
                        if (organizadorSolicitanteBD) {
                            if (organizadorSolicitanteBD.contrasenna == req.body.contrasenna) {
                                res.json({
                                    resultado: true,
                                    usuario: organizadorSolicitanteBD
                                });
                            } else {
                                res.json({
                                    resultado: false,
                                    msg: 'La contraseña no coincide organizador solicitante'
                                });
                            }
                        } else {
                            Empresa.findOne({ correo: req.body.correo })
                                .then(function(empresaBD) {
                                    if (empresaBD) {
                                        if (empresaBD.contrasenna == req.body.contrasenna) {
                                            res.json({
                                                resultado: true,
                                                usuario: empresaBD
                                            });
                                        } else {
                                            res.json({
                                                resultado: false,
                                                msg: 'La contraseña no coincide empresa'
                                            })
                                        }
                                    } else {
                                        Encargado.findOne({ correo: req.body.correo })
                                            .then(function(encargadoBD) {
                                                if (encargadoBD) {
                                                    if (encargadoBD.contrasenna == req.body.contrasenna) {
                                                        res.json({
                                                            resultado: true,
                                                            usuario: encargadoBD
                                                        });
                                                    } else {
                                                        res.json({
                                                            resultado: false,
                                                            msg: 'La contraseña no coincide encargado'
                                                        });
                                                    }
                                                } else {
                                                    res.json({
                                                        resultado: false,
                                                        msg: 'No existe el usuario'
                                                    });
                                                }
                                            })
                                    }
                                });
                        }
                    });
            }

        });
});




router.get('/listar-usuarios', function(req, res) {
    // Usuario.find(function (err, usuariosBD) {
    //     if (err) {
    //         res.json({
    //             resultado: false,
    //             msg: 'No se encontraron usuarios',
    //             err
    //         })
    //     } else {
    //         res.json({
    //             resultado: true,
    //             usuarios: usuariosBD
    //         })
    //     };

    // });

    Usuario.find(function(err, usuariosBD) {
        if (usuariosBD) {
            organizadorSolicitante.find(function(err, organizadorSolicitanteBD) {
                if (organizadorSolicitanteBD) {
                    Empresa.find(function(err, empresaBD) {
                        if (empresaBD) {
                            Encargado.find(function(err, encargadoBD) {
                                if (encargadoBD) {
                                    res.json({
                                        resultado: true,
                                        clientes: usuariosBD,
                                        organizadores: organizadorSolicitanteBD,
                                        empresas: empresaBD,
                                        encargados: encargadoBD
                                    });
                                } else {
                                    res.json({
                                        resultado: false,
                                        msg: 'Error en encargado'
                                    })
                                }
                            });
                        } else {
                            res.json({
                                resultado: false,
                                msg: 'Error en empresa'
                            });
                        }
                    });
                } else {
                    res.json({
                        resultado: false,
                        msg: 'Error en organizador'
                    });
                }
            });
        } else {
            res.json({
                resultado: false,
                msg: 'Error en usuarios'
            });
        }
    });

});


router.post('/agregar-tarjeta', function(req, res) {
    Usuario.update({ _id: req.body._id }, {
        $push: {
            'tarjeta': {
                marca: req.body.marca,
                numero: req.body.numero,
                fechaExpiracion: req.body.fechaExpiracion,
                codigoSeguridad: req.body.codigoSeguridad
            }
        }
    }, function(err) {
        if (err) {
            return res.json({
                resultado: false,
                msg: 'No se pudo agregar la tarjeta',
                err
            });
        } else {
            return res.json({
                resultado: true,
                msg: 'Se agregó la tarjeta correctamente'
            });
        }
    })
});


router.post("/buscar-usuario", function(req, res) {


    Usuario.findOne({ correo: req.body.correo })
        .then(function(usuarioBD) {
            if (usuarioBD) {
                res.json({
                    resultado: true,
                    usuario: usuarioBD


                });
            } else {
                organizadorSolicitante.findOne({ correo: req.body.correo })
                    .then(function(organizadorSolicitanteBD) {
                        if (organizadorSolicitanteBD) {
                            res.json({
                                resultado: true,
                                usuario: usuarioBD
                            })
                        } else {
                            Empresa.findOne({ correo: req.body.correo })
                                .then(function(empresaBD) {
                                    if (empresaBD) {
                                        res.json({
                                            resultado: true,
                                            usuario: usuarioBD
                                        })
                                    } else {
                                        res.json({
                                            resultado: false,
                                            msg: 'No existe el usuario'
                                        });
                                    }
                                });
                        }
                    });
            }

        });
    //mostrarInfo();

});



/*
router.post('/buscar-usuario', function(req, res) {


    Usuario.findById({_id: req.body._id })
        .then(function(usuarioBD) {
            if (usuarioBD) {
                if (usuarioBD.contrasenna == req.body.contrasenna) {
                    res.json({
                        resultado: true,
                        usuario: usuarioBD
                    });
                } else {
                    res.json({
                        resultado: false,
                        msg: 'La contraseña no coincide usuario'
                    });
                }
            } else {
                organizadorSolicitante.findOne({ correo: req.body.correo })
                    .then(function(organizadorSolicitanteBD) {
                        if (organizadorSolicitanteBD) {
                            if (organizadorSolicitanteBD.contrasenna == req.body.contrasenna) {
                                res.json({
                                    resultado: true,
                                    usuario: organizadorSolicitanteBD
                                });
                            } else {
                                res.json({
                                    resultado: false,
                                    msg: 'La contraseña no coincide organizador solicitante'
                                });
                            }
                        } else {
                            Empresa.findOne({ correo: req.body.correo })
                                .then(function(empresaBD) {
                                    if (empresaBD) {
                                        if (empresaBD.contrasenna == req.body.contrasenna) {
                                            res.json({
                                                resultado: true,
                                                usuario: empresaBD
                                            });
                                        } else {
                                            res.json({
                                                resultado: false,
                                                msg: 'La contraseña no coincide empresa'
                                            })
                                        }
                                    } else {
                                        res.json({
                                            resultado: false,
                                            msg: 'No existe el usuario'
                                        });
                                    }
                                });
                        }
                    });
            }

        });
});
*/




router.post('/recuperar-contrasenna', function(req, res) {

    console.log("data pararecuperación de contraseña");
    console.log(req.body);
    console.log("inicio de lafuncion de recuperaion de contraseña");
    Usuario.findOne({ correo: req.body.correo })
        .then(function(usuarioBD) {
            if (usuarioBD) {
                console.log("info de usuario encontrado");
                console.log(usuarioBD);

                usuarioBD.contrasenna;

                let mailOptions = {
                    from: 'Ticket Pixel',
                    to: usuarioBD.correo,
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
                            <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                            <h1>Bienvenido a Ticket pixel</h1>
                            <h4>La mejor manera de comprar entradas en linea</h4>
                        </div>
                        <hr>
                        
                        
                    
                        <div class="info_credenciales">
                            <p>Saludos</p>
                            <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                            <br>
                            
                            <p>Su contraseña es:  <span> ${usuarioBD.contrasenna} </span></p>
                        </div>
                        <br>
                        <br>
                        <hr>
                        <p class="footer">Este mensaje se envió a ${usuarioBD.correo}</p>
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
                    usuario: usuarioBD


                });


            } else {
                organizadorSolicitante.findOne({ correo: req.body.correo })
                    .then(function(organizadorSolicitanteBD) {
                        if (organizadorSolicitanteBD) {

                            organizadorSolicitanteBD.contrasenna;

                            let mailOptions = {
                                from: 'Ticket Pixel',
                                to: organizadorSolicitanteBD.correo,
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
                                        <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                                        <h1>Bienvenido a Ticket pixel</h1>
                                        <h4>La mejor manera de comprar entradas en linea</h4>
                                    </div>
                                    <hr>
                                    
                                    
                                
                                    <div class="info_credenciales">
                                        <p>Saludos</p>
                                        <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                                        <br>
                                        
                                        <p>Su contraseña es:  <span> ${organizadorSolicitanteBD.contrasenna} </span></p>
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


                        } else {
                            Empresa.findOne({ correo: req.body.correo })
                                .then(function(empresaBD) {
                                    if (empresaBD) {

                                        empresaBD.contrasenna;

                                        let mailOptions = {
                                            from: 'Ticket Pixel',
                                            to: empresaBD.correo,
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
                                                    <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                                                    <h1>Bienvenido a Ticket pixel</h1>
                                                    <h4>La mejor manera de comprar entradas en linea</h4>
                                                </div>
                                                <hr>
                                                
                                                
                                            
                                                <div class="info_credenciales">
                                                    <p>Saludos</p>
                                                    <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                                                    <br>
                                                    
                                                    <p>Su contraseña es:  <span> ${empresaBD.contrasenna} </span></p>
                                                </div>
                                                <br>
                                                <br>
                                                <hr>
                                                <p class="footer">Este mensaje se envió a ${empresaBD.correo}</p>
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
                                            usuario: empresaBD
                                        })



                                    } else {
                                        Encargado.findOne({ correo: req.body.correo })
                                            .then(function(encargadoBD) {
                                                if (encargadoBD) {

                                                    encargadoBD.contrasenna;

                                                    let mailOptions = {
                                                        from: 'Ticket Pixel',
                                                        to: encargadoBD.correo,
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
                                                                <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                                                                <h1>Bienvenido a Ticket pixel</h1>
                                                                <h4>La mejor manera de comprar entradas en linea</h4>
                                                            </div>
                                                            <hr>
                                                            
                                                            
                                                        
                                                            <div class="info_credenciales">
                                                                <p>Saludos</p>
                                                                <p>Puede ingresar esta contraseña para iniciar sesión en Ticket pixel:</p>
                                                                <br>
                                                                
                                                                <p>Su contraseña es:  <span> ${encargadoBD.contrasenna} </span></p>
                                                            </div>
                                                            <br>
                                                            <br>
                                                            <hr>
                                                            <p class="footer">Este mensaje se envió a ${encargadoBD.correo}</p>
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
                                                        usuario: encargadoBD
                                                    })



                                                } else {
                                                    res.json({
                                                        resultado: false,
                                                        msg: 'No existe el usuario.'
                                                    });
                                                }
                                            });
                                    }
                                });
                        }

                    });



            }
            //mostrarInfo();

        })
});


router.get('/buscar-usuario-registro/:correo', function(req, res) {
    let correo = req.params.correo;

    Usuario.findOne({ correo: correo }, function(err, usuarioBD) {
        if (usuarioBD) {
            res.json({
                resultado: false,
                msg: 'El correo ya está registrado como usuario',
            });
        } else {
            organizadorSolicitante.findOne({ correo: correo }, function(err, organizadorSolicitanteBD) {
                if (organizadorSolicitanteBD) {
                    res.json({
                        resultado: false,
                        msg: 'El correo ya está registrado como organizador'
                    });
                } else {
                    Empresa.findOne({ correo: correo }, function(err, empresaBD) {
                        if (empresaBD) {
                            res.json({
                                resultado: false,
                                msg: 'El correo ya está registrado como empresa'
                            });
                        } else {
                            Encargado.findOne({ correo: correo }, function(err, encargadoBD) {
                                if (encargadoBD) {
                                    res.json({
                                        resultado: false,
                                        msg: 'El correo ya está registrado como encargado'
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
        }
    });
});

//Editar perfil usuario

router.post('/editar-perfil-usuario', function(req, res) {
    let body = req.body;
    Usuario.updateOne({ _id: body._id }, {
            $set: {
                primerNombre: body.primerNombre,
                segundoNombre: body.segundoNombre,
                primerApellido: body.primerApellido,
                segundoApellido: body.segundoApellido,
                genero: body.genero,
                direccion: body.direccion,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo editar el perfil del usuario',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});


///////////////// BANEAR // DESACTIVAR // ACTIVAR..... USUARIO 
router.post('/editar-usuario-administrador', function(req, res) {
    let body = req.body;

    Usuario.updateOne({ _id: body._id }, {
            $set: req.body
        },
        function(err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el usuario',
                    error: err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                });
            }
        }
    );
});


//Cambiar contraseña

router.post('/primer-cambio-contrasenna', function(req, res) {

    let body = req.body;
    Usuario.updateOne({ _id: body._id }, {
            $set: {
                contrasenna: body.contrasenna
            }
        },

        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo cambiar la contraseña',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )

});



router.post('/agregar-notificacion', function(req, res) {

    let body = req.body;

    Usuario.findOneAndUpdate({ _id: body._id }, {
        $push: {
            'notificaciones': {
                titulo: body.titulo,
                descripcion: body.descripcion,
                fecha: body.fecha
            }
        }
    }).then(function(usuarioBD) {

        let mailOptions = {
            from: 'Ticket Pixel',
            to: usuarioBD.correo,
            subject: 'Compra de entrada',
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
            
                </style>
            
                <title>Cuerpo del correo</title>
            </head>
            
            <body>
            
                <div>
                    <img src="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png" style="height: 75px; margin-left: 25px; padding-top: 10px;" alt="https://res.cloudinary.com/proyecto1-nebula/image/upload/v1573759788/ugkgwpmarggjgiz9ehym.png">
                    <h1>Bienvenido a Ticket pixel</h1>
                    <h4>La mejor manera de comprar entradas en linea</h4>
                </div>
                <hr>
                
                
            
                <div class="info_credenciales">
                    <p>Compra realizada con éxito</p>
                    <p>${body.descripcion}</p>
                    <p>El ID de tu entrada es: ${body.entradaID}</p>
                    <br>
                    <p></p>
                </div>
                <br>
                <br>
                <hr>
                <p class="footer">Este mensaje se envió a ${usuarioBD.correo}</p>
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
            usuario: usuarioBD
        });
    }).catch(function(err) {
        res.json({
            resultado: false,
            error: err
        });
    });

});

router.get('/buscar-usuario-correo/:correo', function(req, res) {
    let correo = req.params.correo;

    Usuario.findOne({ correo: correo }, function(err, usuarioBD) {
        if (usuarioBD) {
            res.json({
                resultado: true,
                usuario: usuarioBD
            });
        } else {
            organizadorSolicitante.findOne({ correo: correo }, function(err, organizadorSolicitanteBD) {
                if (organizadorSolicitanteBD) {
                    res.json({
                        resultado: true,
                        usuario: organizadorSolicitanteBD
                    });
                } else {
                    Empresa.findOne({ correo: correo }, function(err, empresaBD) {
                        if (empresaBD) {
                            res.json({
                                resultado: true,
                                usuario: empresaBD
                            });
                        } else {
                            Encargado.findOne({ correo: correo }, function(err, encargadoBD) {
                                if (encargadoBD) {
                                    res.json({
                                        resultado: true,
                                        usuario: encargadoBD
                                    });
                                } else {
                                    res.json({
                                        resultado: false,
                                        msg: 'El correo no se encontró'
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/agregar-entradas', function(req, res) {
    let body = req.body;

    Usuario.update({ _id: body._id }, {
            $push: {
                'entradas': {
                    idEvento: body.idEvento,
                    numeroEntradas: body.numeroEntradas,
                    fechaEvento: body.fechaEvento,
                    idFecha: body.idFecha,
                    compradas: false
                }
            }
        })
        .then(function(info) {
            res.json({
                resultado: true,
                info: info
            });
        })
        .catch(function(err) {
            res.json({
                resultado: false,
                error: err
            });
        });

});

router.post('/eliminar-entrada', function(req, res) {

    let body = req.body;

    Usuario.update({ _id: body._id }, {
            $pull: {
                'entradas': {
                    _id: body.idEntrada
                }
            }
        })
        .then(function(info) {
            res.json({
                resultado: true,
                info: info
            });
        })
        .catch(function(err) {
            res.json({
                resultado: false,
                error: err
            });
        })
});

router.post('/comprar-entrada', async function(req, res) {

    let body = req.body;

    try {

        const eventoBD = await Evento.findOne({ _id: body.idEvento });
        //const fechasBD = await Evento.findOne({'fechas': {_id: body.idFecha}});

        let fechas = eventoBD.fechas;

        let entradasUsuario = parseInt(body.entradasUsuario);

        let idFecha = body.idFecha;

        let entradasDisponibles = 0;

        for (let i in fechas) {
            if (fechas[i]['_id'] == idFecha) {

                entradasDisponibles = fechas[i]['cantidadAsistentes'] - entradasUsuario;
                console.log(entradasDisponibles);

                eventoBD.fechas[i]['cantidadAsistentes'] = entradasDisponibles;

                await eventoBD.save();
            }
        }

        res.json({
            resultado: true,
            evento: eventoBD
        });
    } catch (err) {
        res.json({
            err
        });
    }

});





module.exports = router;