'use strict';


let verificarCorreo = async(correo) => {
    let resultado;

    await axios({
            method: 'get',
            url: `https://proyecto-software-prod.herokuapp.com/api/buscar-usuario-registro/${correo}`,
            responseType: 'json'
        })
        .then(async function(res) {
            resultado = await res.data.resultado;
        })
        .catch(function(err) {
            console.log(err);
        });

    return resultado;
}

let registrarEncargado = async(correo, telefono, nombreCompleto, fechaDeNacimiento, genero, contrasenna) => {
    let resultado;
    await axios({
                method: 'post',
                url: 'https://proyecto-software-prod.herokuapp.com/api/registrar-encargado',
                responseType: 'json',
                //body
                data: {
                    correo: correo,
                    telefono: telefono,
                    nombreCompleto: nombreCompleto,
                    fechaDeNacimiento: fechaDeNacimiento,
                    genero: genero,
                    contrasenna: contrasenna
                }
            }

        )
        .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
        })
        .catch(function(error) {
            console.log(error);
        });

    return resultado;
};


let listarEncargados = async() => {

    let listaEncargados;
    await axios({
            method: 'get',
            url: 'https://proyecto-software-prod.herokuapp.com/api/listar-encargados',
            responseType: 'json'
        })
        .then(function(res) {
            console.log(res.data);
            listaEncargados = res.data.encargados;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaEncargados;
}