'use strict';

let registrarTarjeta = async (numeroTarjeta, fechaExpiración, codigoSeguridad) => {

    let marca;

    if(tarjetaAmericanExpress(numeroTarjeta)){
        marca = 'American Express'
    }

    if(tarjetaVisa(numeroTarjeta)) {
        marca = 'Visa';
    }

    if(tarjetaMasterCard(numeroTarjeta)){
        marca = 'MasterCard';
    }

    if(tarjetaDiscover(numeroTarjeta)){
        marca = 'Discover';
    }

    if(tarjetaDinnersClub(numeroTarjeta)){
        marca = 'Dinners Club';
    }

    if(tarjetaJCB(numeroTarjeta)){
        marca = 'JCB';
    }

    console.log(marca);

}

let tarjetaAmericanExpress = (numeroTarjeta) => {
    let numero = /^(?:3[47][0-9]{13})$/;

    if(numeroTarjeta.match(numero)){
        return true;
    } else {
        return false;
    }

}


let tarjetaVisa = (numeroTarjeta) => {
    let numero = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    if (numeroTarjeta.match(numero)){
        return true;
    } else {
        return false;
    }
}

let tarjetaMasterCard = (numeroTarjeta) => {
    let numero = /^(?:5[1-5][0-9]{14})$/;
    if(numeroTarjeta.match(numero)){
        return true;
    } else {
        return false;
    }
}

let tarjetaDiscover = (numeroTarjeta) => {
    let numero = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    if(numeroTarjeta.match(numero)){
        return true;
    } else {
        return false;
    }

}

let tarjetaDinnersClub = (numeroTarjeta) => {
    let numero = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    if(numeroTarjeta.match(numero)) {
        return true;
    } else {
        return false;
    }

}

let tarjetaJCB = (numeroTarjeta) => {
    let numero = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
    if(numeroTarjeta.match(numero)){
        return true;
    } else {
        return false;
    }

}

