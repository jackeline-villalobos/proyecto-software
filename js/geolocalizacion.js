/*
Coordenadas San Jose
lat: 9.9333296
lng: -84.0833282
*/


// Initialize and add the map
function initMap() {

    let input_latitud = document.querySelector("#latitud");
    let input_longitud = document.querySelector("#longitud");

    // Convierte los inputs en Floats
    var latitud = parseFloat(input_latitud.value);
    var longitud = parseFloat(input_longitud.value);

    // Obicacion de las coordenadas
    var locacion = { lat: latitud, lng: longitud };
    // El mapa centrado en las coordenadas
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 7, center: locacion });
    // El pin centrado en las coordenadas
    var marker = new google.maps.Marker({ position: locacion, map: map });

    return locacion;

}