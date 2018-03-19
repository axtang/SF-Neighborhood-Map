'use strict';

var locations = [

{
	title: "Palace of Fine Art Theatre",
	streetAddress: "3301 Lyon St, San Francisco, CA 94123",
},

{
	title: "Google Launch Pad",
	streetAddress: "301 Howard Street, 4th Floor, San Francisco, CA 94105",
},

{
	title: "California Academy of Sciences",
	streetAddress: "55 Music Concourse Dr, San Francisco, CA 94118",
},

{
	title: "Exploratorium",
	streetAddress: "Pier 15 The Embarcadero, San Francisco, CA 94111",
},

{
	title: "Crissy Field",
	streetAddress: "1199 E Beach, San Francisco, CA 94129-1605",
},

{
	title: "Lands End",
	streetAddress: "680 Point Lobos Ave, San Francisco, CA 94121",
},

{
	title: "Mount Tamalpis State Park",
	streetAddress: "3801 Panoramic Hwy, Mill Valley, CA 94941",
}
]

// View function
var mapView = function() {
	var self = this;

	this.filter = ko.observable("");

	this.filteredLocations = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			Locations.forEach(function(location) {
				if (location.marker) {
					location.marker.setVisible(true);
				}
			});
			return Locations;
		} else {
			return ko.utils.arrayFilter(Locations, function(location) {
				var match = location.name.toLowerCase().indexof(filter) !== -1;
				if (match) {
					location.marker.setVisible(true);
				} else {
					location.marker.setVisible(false);
				}
				return match;
			});
		}
	});
}