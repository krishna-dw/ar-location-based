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
    if (e.accuracy <= 16.0) {
        if (!playerIcon) {
            playerIcon = new L.marker(e.latlng).addTo(this.map);
        } else {
            playerIcon.setLatLng(e.latlng);
        }
    } else {
        // alert(e.accuracy);
    }

    map.panTo(e.latlng);
}).on("locationerror", error => {
    if (playerIcon) {
        map.removeLayer(playerIcon);
        playerIcon = undefined;
    }
});

function manualLatLong() {
    const entity = document.createElement("a-box");

    const manual_lat = document.getElementById('mml_latitude').value;
    const manual_long = document.getElementById('mml_longitude').value;

    entity.setAttribute("scale", {
        x: 5,
        y: 5,
        z: 5
    });
    entity.setAttribute('material', { color: 'blue' });
    entity.setAttribute('gps-new-entity-place', {
        latitude: manual_lat,
        longitude: manual_long
    });
    document.querySelector("a-scene").appendChild(entity);
}