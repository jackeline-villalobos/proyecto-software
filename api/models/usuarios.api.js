'use strict';

const usuarioModel = require('./usuarios.model');

module.exports.registrar = function(req, res){

    let nuevoUsuario = new usuarioModel(
        {
            primerNombre: req.body.primerNombre,
            segundoNombre: req.body.segundoNombre,
            primerApellido: req.body.primerApellido,
            segundoApellido: req.body.segundoApellido,
            correo: req.body.correo,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            genero: req.body.genero,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            imagen: req.body.imagen,
            estado: req.body.estado
            //contrasenna: req.body.contrasenna
            //tarjeta: req.body.tarjeta,
            
        }
    );

    nuevoUsuario.save( 
        function(error){
            if(error == true){
                res.json(
                    {
                        success: false,
                        mensaje: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error
                    }
                );
            }else{
                res.json({success: true, mensaje: 'El usuario se registró con éxito'});
            }
    });
       
    
};

module.exports.validar = function(req, res){
    usuarioModel.findOne({correo: req.body.correo}).then(
        function(usuario){
            if(usuario){
                if(usuario.contrasenna == req.body.contrasenna){
                    res.json({
                        success: true,
                        usuario: usuario
                    });
                }else{
                    res.json({
                        success: false
                    });
                }
            }else{
                res.json({
                    success: false,
                    mensaje: 'El usario no existe'
                });
            }
        }
    )
};