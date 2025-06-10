var map = L.map('map', { attributionControl: false, zoomControl: false }).fitWorld();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var playerIcon;

class RenderedMarker {
    mapMarker;
    constructor(latLng, isRendered = false) {
        this.latLng = latLng;
        this.isRendered = isRendered;
    }
}

var markers = [];


const debug_space = document.getElementById('debug_space');

var locTimes = 0;

map.locate({
    setView: true,
    watch: true,
    // enableHighAccuracy: true,
    maxZoom: 18
}).on("locationfound", e => {
    locTimes += 1;
    if (!playerIcon) {
        playerIcon = new L.marker(e.latlng).addTo(this.map);
    } else {
        playerIcon.setLatLng(e.latlng);
    }

    map.panTo(e.latlng);
    debug_space.innerHTML = '#' + locTimes + ' Location';
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
    entity.setAttribute('material', { color: 'green' });
    entity.setAttribute('gps-new-entity-place', {
        latitude: manual_lat,
        longitude: manual_long
    });
    document.querySelector("a-scene").appendChild(entity);

    markers.push(new RenderedMarker(new L.latLng(manual_lat, manual_long), false));

    redrawMarkers();
}

function redrawMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].isRendered === false) {
            markers[i].isRendered = true;
            markers[i].mapMarker = new L.marker(markers[i].latLng).addTo(this.map);
        }
    }
}