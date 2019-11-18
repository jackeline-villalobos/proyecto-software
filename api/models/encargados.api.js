'use strict';

const encargadoModel = require('./encargados.model');

module.exports.registrar = function(req, res){

    let nuevoEncargado = new encargadoModel(
        {
            correoElectronico: req.body.correoElectronico,
            telefono: req.body.telefono,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            nombreCompleto: req.body.nombreCompleto,
            genero: req.body.genero,
            //contrasenna: req.body.contrasenna
            
        }
    );

    nuevoEncargado.save( 
        function(error){
            if(error == true){
                res.json(
                    {
                        success: false,
                        mensaje: 'No se pudo registrar el encargado, ocurrió el siguiente error' + error
                    }
                );
            }else{
                res.json({success: true, mensaje: 'El encargado se registró con éxito'});
            }
    });
       
    
};

module.exports.validar = function(req, res){
    encargadoModel.findOne({correo: req.body.correo}).then(
        function(encargado){
            if(encargado){
                if(encargado.contrasenna == req.body.contrasenna){
                    res.json({
                        success: true,
                        encargado: encargado
                    });
                }else{
                    res.json({
                        success: false
                    });
                }
            }else{
                res.json({
                    success: false,
                    mensaje: 'El encargado no existe'
                });
            }
        }
    )
};