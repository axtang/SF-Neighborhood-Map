var octopus = function() {
	var self = this;
	var map = [];

	// Create an infoWindow to display locations
	var markers = [];
	var infoWindow;

	// Generate anti-forgery state token for Yelp API Oauth
	function AFStoken() {
		return AFStoken = ''.join(random.choice(string.ascii_uppercase + string.digits)
        for x in xrange(32))
	}

	// Yelp api key: Z6vEu8oKl556q0tsFr2wgEgH2EDJqBbtD_7CphzrcP_q4Hdh4IPhnp13QK0O9z7kr3YT7eQkPX9yI38KxZGkDl0IFtKXCLfiQ87Uy788eTQXjGJejsW-Ogd8_RlyWnYx

	// Calling Yelp API for their search and reviews functions
	function getYelpSearch() {
		var search_url = "https://api.yelp.com/v3/businesses/search"
		var consumer_secret = ""
		var token = ""

		// Ajax-request parameters
		var parameters = {
			oauth_user_secret: "",
			oauth_token: "",
			oauth_signature_method: "",
			oauth_timestamp: Math.round((new Date()).getTime()/1000.0),
			oauth_nonce:
			oauth_version: '1.0',
			callback: 'cb',
			term: locations.title,
			location: 'San Francisco, CA',
			limit: 1
		}

		// Generate Oauth signature
		var encodedSignature = oauthSignature.generate('GET, search_url, parameters, consumer_secret, token_secret');
		parameters.oauth_signature = encodedSignature;

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

	function initMap(){
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: location,
			mapTypeControl: true,
			mapTypeControlOption: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.BOTTOM_CENTER
			},
			mapTypeId: 'roadmap',

			styles: styles
		});

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});

		var marker = new google.maps.Marker({
			map: map,
			draggable: true;
			animation: google.maps.Animation.DROP,
			position: location
		});

		// When a marker is clicked, the marker bounces
		// and the infowindow opens
		marker.addListener('click', toggleBounce);
		marker.addListener('click', function(){
			infowindow.open(map, marker);
		});

		// Geocoding to get Lat and Lng from the addresses in markers.js
		var geocoder = new google.maps.Geocoder();

		locations.forEach(function(place) {
			geocodeAddress(geocoder, map, place);
		});

		document.getElementById('submit').addEventListener('click', function(){
			geocodeAddress(geocoder, map);
		});


	// Making the markers bounce
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
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
			} else {
				alert('Geocode was not successful fo the following reason: ' + status);
			}
		});
	}
}