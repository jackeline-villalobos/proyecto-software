'use strict';


let enviarContrasennaPreviamenteGuardada = async(correo) => {
    let resultado;
    // let contrasenna;

    await axios({
        method: 'post',
        url: 'https://proyecto-software-prod.herokuapp.com/api/recuperar-contrasenna',
        responseType: 'json',
        data: {
            correo: correo,
            // contrasenna: contrasenna,

        }
    })

    .then(async function(res) {
            console.log(res.data);
            resultado = await res.data;
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


// let recuperarContrasennaEmail = async(email) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             params: { email: email },
//             url: `http://localhost:3000/api/recuperar-contrasenna`,
//             responseType: 'json'
//         });
//         return response.data.cliente;
//     }catch (error){
//         console.log(error);
//     }
// };

// recuperarContrasennaEmail('prodriguezc@ucenfotec.ac.cr');