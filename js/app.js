'use strict';

// Set global variables.
var ko;
var google;
var map;
var markers;
var geocoder;
var infoWindow;

var Locations = [

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


// Google maps styles.
var styles = [
{
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e5c163"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#c4c4c4"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e5c163"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e5c163"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#e5c163"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#575757"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#999999"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }];


function geocodeAddress(geocoder, resultsMap, location) {
    // var address = document.getElementById('address').value;
    var address = location.address;

    geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
		resultsMap.setCenter(results[0].geometry.location);
		var marker = new google.maps.Marker({
		    map: resultsMap,
		    position: results[0].geometry.location
		});
		// When a marker is clicked, marker will bounce and
		// Yelp api will be called.
		google.maps.event.addListener(place.marker, 'click', function() {
			yelpSearch(location);
			toggleBounce(location.marker);
		});

		markers.push({
			name: location.name,
			marker: location.marker
		});

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


// When a marker is clicked, make it bounce.
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		}, 1400)
	}
}


// When an item is clicked, open its corresponding
// window to display info.
function clickedMarker(name) {
	markers.forEach(function(eachMarker) {
		if (eachMarker.name == name) {
			google.maps.event.trigger(eachMarker.marker, 'click');
		}
	});
}


// Autocomplete the search phrase in the search box.
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


// Use Yelp Search API to get information on each location.
function yelpSearch(location) {
	var search_url = "https://api.yelp.com/v3/businesses/search"
	// Place holder for Yelp Fusion's API Key. Grab them
	// from https://www.yelp.com/developers/v3/manage_app
	var apiKey = 'E6aW2ikgxQGFRFbdpyPfUGr9ElR3Ie29RFR6YI_OgJXeBUL7XjPD3dgdbgdumZ836300GoRUmHryG0pBq2KSxH1Df82xTEOsFCppVPms3tQRUDjjbJeDdAvWYxajWnYx';
	
	var yelpTimeout = setTimeout(function(){
		console.log("failed to get yelp resources");
	}, 8000);

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



// Show an error message when map failed to load.
function mapError() {
	alert("Google Map failed to load. Please try again.")
}


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


// View function
var mapViewModel = function() {
	var self = this;

	this.filter = ko.observable("");
	// Location filter based on input.
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