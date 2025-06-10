var map = L.map('map', { attributionControl: false, zoomControl: false }).fitWorld();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var marker;

map.locate({
    setView: true,
    maxZoom: 19
}).on("locationfound", e => {
    if (!marker) {
        marker = new L.marker(e.latlng).addTo(this.map);
    } else {
        marker.setLatLng(e.latlng);
    }
}).on("locationerror", error => {
    if (marker) {
        map.removeLayer(marker);
        marker = undefined;
    }
});