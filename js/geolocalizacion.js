/*
Coordenadas San Jose
lat: 9.9333296
lng: -84.0833282



if (marker && marker.setMap) {
        marker.setMap(null);
}


*/
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 9.9333296, lng: -84.0833282 }
    });

    google.maps.event.addListener(map, "click", function(e) {

        placeMarkerAndPanTo(e.latLng, map);
    });

}

function placeMarkerAndPanTo(latLng, map) {

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
    });


    map.panTo(latLng);


    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    console.log(lat, lng);

    $("#latitud").val(lat);
    $("#longitud").val(lng);


}

function clearMarkers() {
    markers = null;
}




// Initialize and add the map
function ubicarMap() {


    let input_latitud = document.querySelector("#latitud");
    let input_longitud = document.querySelector("#longitud");

    // Convierte los inputs en Floats
    var latitud = parseFloat(input_latitud.value);
    var longitud = parseFloat(input_longitud.value);

    // Obicacion de las coordenadas
    var locacion = { lat: latitud, lng: longitud };
    // El mapa centrado en las coordenadas
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 11, center: locacion });
    // El pin centrado en las coordenadas
    var marker = new google.maps.Marker({ position: locacion, map: map });

    return locacion;

}