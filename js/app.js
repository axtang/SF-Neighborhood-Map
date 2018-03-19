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
];


// Yelp Search API
function getYelpSearch() {
	const search_url = "https://api.yelp.com/v3/businesses/search";
	const yelp = require('yelp-fusion');
	// Place holder for Yelp Fusion's API Key. Grab them
	// from https://www.yelp.com/developers/v3/manage_app
	const apiKey = 'E6aW2ikgxQGFRFbdpyPfUGr9ElR3Ie29RFR6YI_OgJXeBUL7XjPD3dgdbgdumZ836300GoRUmHryG0pBq2KSxH1Df82xTEOsFCppVPms3tQRUDjjbJeDdAvWYxajWnYx';

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	$.ajax({
		url: search_url,
		data: parameters,
		cache: true,
		dataType: 'jsonp'
	}).done(function(data){
		var rating = data.businesses[0].rating_img_url;
		var review_count = data.businesses[0].review_count;
		var phone = data.businesses[0].display_phone;
		var snippet = data.businesses[0].snippet_text;
		var link = data.business[0].url;
		var category = data.businesses[0].categories[0][0];
		var picture = data.businesses[0].image_url;

		// display local information on the infoWindow
		var content = '<div><h3>' + locations.title + '</h3>' + 
		'<img href=">' + picture + '">' +
		'<p>' + place.address + '</p>' +
		'<p><strong>Category: </strong>' + category + '</p>' + 
		'<p><strong>Yelp Ratings: </strong>' + 
		'<p><strong>Number of reviews: </strong>' +
		'<p><strong>Phone: </strong>' + phone +'</p>' + 
		'<img src = "' + rating + '"></p>' +
		'<p><strong>Reviews: </strong>' + snippet + '<a href="' + link + '">Read more</a></p>' +
		'</div>';
	}). fail(function() {
		alert("Yelp review failed to load. Please try again.")
	});
}


// GOogle JavaScript Maps API
// Set variables as global 
var markers = [];
var infoWindow;

// If map failed to load
function mapError() {
	alert("Google Map failed to load. Please try again.")
}

// Google maps
// Initiate map
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: location,
		mapTypeControl: true,
		mapTypeControlOption: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		styles: [
			    {
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "off"
			            },
			            {
			                "color": "#f49f53"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "stylers": [
			            {
			                "color": "#f9ddc5"
			            },
			            {
			                "lightness": -7
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "stylers": [
			            {
			                "color": "#813033"
			            },
			            {
			                "lightness": 43
			            }
			        ]
			    },
			    {
			        "featureType": "poi.business",
			        "stylers": [
			            {
			                "color": "#645c20"
			            },
			            {
			                "lightness": 38
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "stylers": [
			            {
			                "color": "#1994bf"
			            },
			            {
			                "saturation": -69
			            },
			            {
			                "gamma": 0.99
			            },
			            {
			                "lightness": 43
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#f19f53"
			            },
			            {
			                "weight": 1.3
			            },
			            {
			                "visibility": "on"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "poi.business"
			    },
			    {
			        "featureType": "poi.park",
			        "stylers": [
			            {
			                "color": "#645c20"
			            },
			            {
			                "lightness": 39
			            }
			        ]
			    },
			    {
			        "featureType": "poi.school",
			        "stylers": [
			            {
			                "color": "#a95521"
			            },
			            {
			                "lightness": 35
			            }
			        ]
			    },
			    {},
			    {
			        "featureType": "poi.medical",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#813033"
			            },
			            {
			                "lightness": 38
			            },
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {},
			    {
			        "elementType": "labels"
			    },
			    {
			        "featureType": "poi.sports_complex",
			        "stylers": [
			            {
			                "color": "#9e5916"
			            },
			            {
			                "lightness": 32
			            }
			        ]
			    },
			    {},
			    {
			        "featureType": "poi.government",
			        "stylers": [
			            {
			                "color": "#9e5916"
			            },
			            {
			                "lightness": 46
			            }
			        ]
			    },
			    {
			        "featureType": "transit.station",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "transit.line",
			        "stylers": [
			            {
			                "color": "#813033"
			            },
			            {
			                "lightness": 22
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "stylers": [
			            {
			                "lightness": 38
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#f19f53"
			            },
			            {
			                "lightness": -10
			            }
			        ]
			    },
			    {},
			    {},
			    {}
					]
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});
		var geocoding = new google.maps.Geocoding();

		locations.forEach(function(location){
			geocodeAddress(geocoding, map, location);
		});

		ko.applyBindings(new mapView());

}

// Converting the addresses into lats and lngs
function geocodeAddress(geocoder, resultsMap, place) {
	// grab the street address from markers.js
	var address = locations.streetAddress

	// If the address exists, place a marker on the location
	// Else, return error message
	geocoder.geocode({'address': address}, function(results, status){
		if (status === 'OK') {
			resultsMap.setCenter(results[0].geometry.location);
			place.marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location,
				animation: google.Maps.Animation.DROP
			});

			google.maps.event.addLIstener(place.marker, 'click', function) {
				getYelpSearch(location);
				toggleBounce(place.marker);
			});

			markers.push ({
				name: location.name,
				marker: lcoation.marker
			});

		} else {
			alert('Geocode was not successful fo the following reason: ' + status);
		}
	});
}

// Make the marker jump when clicked
function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		}, 1400)
	}
}

function clickedMarker(name) {
	markers.forEach(function(eachMarker) {
		if (eachMarker.name == name) {
			google.maps.event.trigger(eachMarker.marker, 'click');
		}
	});
}

// Adding a search box to a map with autocomplete feature
function initAutocomplete() {
	// creat the search box and link it to the UI element
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.locations.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// bias the search box results towards the current map's viewport
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	
	// listen for the event fired when the user selects a prediction
	// and retrieve more details for that place
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		// clear out old markers
		markers.forEach(function(marker){
			marker.setmap(null);
		});
		markers = [];

		// for each place, get the icon, name and location
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place){
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// create a marker for each place
			markers.push(new google.maps.Marker({
				map: map,
				icon: icon,
				title: place.name,
				position: place.geometry.location
			}));

			if (place.geometry.viewport) {
				// only geocodes have viewport
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});	
}


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