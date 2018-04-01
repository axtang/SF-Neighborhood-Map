function startMap() {
	initMap();
	var mapViewModel = new mapViewModel();
	// Bind the variables in initMap to mapView().
	ko.applyBindings(mapViewModel);
}