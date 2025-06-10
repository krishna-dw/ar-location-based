var map = L.map('map', { attributionControl: false, zoomControl: false }).fitWorld();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var playerIcon;

map.locate({
    setView: true,
    watch: true,
    enableHighAccuracy: true,
    maxZoom: 18
}).on("locationfound", e => {
    console.log(e);
    if (e.accuracy <= 0.5) {
        if (!playerIcon) {
            playerIcon = new L.marker(e.latlng).addTo(this.map);
        } else {
            playerIcon.setLatLng(e.latlng);
        }
    }

    map.panTo(e.latlng);
}).on("locationerror", error => {
    if (playerIcon) {
        map.removeLayer(playerIcon);
        playerIcon = undefined;
    }
});

function manualLatLong() {
    const model = document.getElementById('target_model');

    const manual_lat = document.getElementById('mml_latitude');
    const manual_long = document.getElementById('mml_longitude');

    model.setAttribute('gps-new-entity-place', {
        latitude: manual_lat,
        longitude: manual_long
    });
}