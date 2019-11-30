/*
San Jose:
var latitud = 9.18933434
var longitud = -84.435435
*/

// Initialize and add the map
function initMap(latitud, longitud) {

    // Obicacion de las coordenadas

    var locacion = { lat: latitud, lng: longitud };
    // El mapa centrado en las coordenadas
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 11, center: locacion });
    // El pin centrado en las coordenadas
    var marker = new google.maps.Marker({ position: locacion, map: map });

}