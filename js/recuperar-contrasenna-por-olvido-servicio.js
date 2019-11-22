'use strict';


let enviarContrasennaPreviamenteGuardada = async(correo) => {
    let resultado;
    let contrasenna;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/recuperar-contrasenna-por-olvido',
        responseType: 'json',
        data: {
            correo: correo,
            contrasenna: contrasenna,
           
        }
    })

    .then(async function(res) {
        console.log(res.data);
        resultado= await res.data;
    })
    .catch(function(error) {
        console.log(error)
    });

    return resultado;


};


// let enviarContrasennaPreviamenteGuardada = async(correo) => {
//     // let resultado;
//     let contrasenna;

//     await axios({
//         method: 'get',
//         url: 'http://localhost:3000/api/recuperar-contrasenna-por-olvido',
//         responseType: 'json',
//         data: {
//             correo: correo,
//             contrasenna: contrasenna,
           
//         }
//     })

//     .then(function(res) {
//             console.log(res.data);
//             contrasenna= res.data.usuarios;
//         })
//         .catch(function(error) {
//             console.log(error)
//         });

//     return contrasenna;

// };



// let listarUsuarios = async() => {

//     let listaUsuarios;
//     await axios({
//         method : 'get',
//         url : 'http://localhost:3000/api/listar-usuarios',
//         responseType: 'json'
//     })
//     .then(function(res) {
//         console.log(res.data);
//         listaUsuarios = res.data.usuarios;
//     })
//     .catch(function(error){
//         console.log(error);
//     });

//     return listaUsuarios;
// }