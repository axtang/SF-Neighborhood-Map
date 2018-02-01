var view = function() {
	var self = this;

	this filter = ko.observable("");

	this.filteredLocations = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			locations.forEach(function(location) {
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