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
    if (!playerIcon) {
        playerIcon = new L.marker(e.latlng).addTo(this.map);
    } else {
        playerIcon.setLatLng(e.latlng);
    }

    map.panTo(e.latlng);
}).on("locationerror", error => {
    if (playerIcon) {
        map.removeLayer(playerIcon);
        playerIcon = undefined;
    }
});