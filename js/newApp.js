var map;
var markers = [];
var placeMarkers = [];
// Initiate Google maps
// Activated through the api key link in map.html.
function initMap() {
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


	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		// Set center at Coit Tower.
		center: {lat: 37.8024, lng: 122.4058},
		styles: styles,
		mapTypeControl: false
	});

    // Create a searchbox in order to execute a places search
    var searchBox = new google.maps.places.SearchBox(
        document.getElementById('places-search'));
    // Bias the searchbox to within the bounds of the map.
    searchBox.setBounds(map.getBounds());
	// Initiate geocoder
	var geocoder = new google.maps.Geocoder();

	// For each address on Locations array,
	// call function geocodeAddress() on it.
	Locations.forEach(function(location) {
	geocodeAddress(geocoder, map, location);
	});
	//google.maps.event.addDomListener(window, "load", initMap);
	ko.applyBindings(new mapViewModel());

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
	// Initiate large infoWindow.
	var largeInfowindow = new google.maps.InfoWindow();
    // Default marker icon style.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Highlight icon when it's clicked.
    var highlightedIcon = makeMarkerIcon('FFFF24');

}
