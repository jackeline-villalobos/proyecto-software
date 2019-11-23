'use strict';
const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();


//Se declaran todos los accesos de los archivos routes.
const impuesto = require('./routes/impuesto.route');
const evento = require('./routes/evento.route');
const empresa = require("./routes/empresa.route")
    //const primeraContrasenna = require('./cambiar-primera-contrasenna');
    //const descuento = require('./routes/descuento.route');
const tipoEvento = require("./routes/tipo-evento.route");
const usuario = require('./routes/usuario.route');
const recinto = require('./routes/recinto.route');
const encargado = require('./routes/encargado.route');
const organizadorSolicitante = require('./routes/organizadorSolicitante.route');
const landingPage = require('./routes/landing-page.route');



const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Se crea variable db para ser reutilizada en el "callback".
let db;


//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raiz del proyecto.
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    //Guarda el objeto db para que el callback la pueda reutilizar.
    db = database;
    console.log("Se estableció la conexión con la base datos.");
    // Se inicia la aplicacion.
    const server = app.listen(process.env.PORT || 8000, function() {
        let port = server.address().port;
        console.log("La aplicación está levantada en el puerto: ", port);
    });
});


//Error general en caso de que falle un "endpoint".
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}


// Conexión a todas la rutas.
app.use('/api', impuesto);
app.use('/api', evento);
app.use("/api", empresa);
//app.use('/api', primeraContrasenna);
//app.use('/api', descuento);
app.use("/api", tipoEvento);
app.use("/api", usuario);
app.use("/api", recinto);
app.use("/api", encargado);
app.use("/api", organizadorSolicitante);
app.use('/api', landingPage);