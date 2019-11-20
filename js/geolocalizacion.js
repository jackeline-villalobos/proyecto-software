/*
Coordenadas San Jose
lat: 9.9333296
lng: -84.0833282
*/


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 9.9333296, lng: -84.0833282 }
    });

    map.addListener('click', function(e) {

        placeMarkerAndPanTo(e.latLng, map);
    });
}

function placeMarkerAndPanTo(latLng, map) {


    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });


    map.panTo(latLng);


    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    console.log(lat, lng);

    $("#latitud").val(lat);
    $("#longitud").val(lng);





}

function clearMarkers() {
    setMapOnAll(null);
    markers = [];
}



/*
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
*/