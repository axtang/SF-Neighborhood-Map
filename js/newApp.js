var markers = [];
// Initiate Google maps
// Activated through the api key link in map.html.
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 13,
	// Set center at Coit Tower.
	center: {lat: 37.8024, lng: 122.4058},
	styles: styles
	});
	// Initiate geocoder
	geocoder = new google.maps.Geocoder();

	// Initiate infoWindow
	infoWindow = new google.maps.InfoWindow();

	// For each address on Locations array,
	// call function geocodeAddress() on it.
	Locations.forEach(function(location) {
	geocodeAddress(geocoder, map, location);
	});
	//google.maps.event.addDomListener(window, "load", initMap);
	ko.applyBindings(new mapViewModel());
}
