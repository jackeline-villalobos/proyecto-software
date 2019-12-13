'use strict';

const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'equiponebula2019@gmail.com',
        pass: 'krashcenfo1'
    }
});

router.post('/mail-landing-page', function (req, res) {

    let mailOptions = {
        from: 'Ticket Pixel',
        to: req.body.correo,
        subject: 'Bienvenido a Ticket pixel',
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
                    color: black;
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
                    height: 40px;
                    width: 82px;
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
                <p>Saludos ${req.body.correo}:</p>
                <p>Lo invitamos a registrarse a Ticket Pixel:</p>
                <br>
                <p>Somos una empresa de capital 100% costarricense. Notamos una necesidad de mercado al darnos cuenta de lo incómodo/inconveniente que puede resultar tener que movilizarse hasta el punto de venta para adquirir una entrada. A raíz de eso se fundó CR Tickets el año 2018. </p>
                <p>El propósito de Ticket pixel es brindar al usuario la mejor experiencia a la hora de comprar entradas en línea. Tomando en cuenta las necesidades de todos nuestros clientes, desde asientos preferenciales, hasta para los adultos mayores. La comodidad de nuestros clientes es nuestra prioridad.</p>
                
                <a href="http://127.0.0.1:5503/index.html">
                <button>Comience ahora</button>
                </a>
            </div>
            <br>
            <br>
            <hr>
            <p class="footer">Este mensaje se envió a ${req.body.correo}</p>
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

    res.json({
        resultado: true,
        msg: 'Se envió el correo con éxito!'
    });

});

module.exports = router;