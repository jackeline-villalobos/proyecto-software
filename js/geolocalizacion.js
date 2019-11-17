const input_latitud = document.querySelector("#latitud");
const input_longitud = document.querySelector("#longitud");

const btnCoordenadas = document.querySelector("#coordenadas");


let latitud = input_latitud.value;
let longitud = input_longitud.value;



// Initialize and add the map
function initMap() {


    // The location of Uluru
    var uluru = { lat: 9.9281, lng: 84.0907 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });


}

btnCoordenadas.addEventListener('click', initMap);

/*
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud, longitud),
        map: map,
    });

    function myMap(latitud, longitud) {
        var mapProp = {
            center: new google.maps.LatLng(latitud, longitud),
            zoom: 5,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    */