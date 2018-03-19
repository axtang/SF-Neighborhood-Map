function getYelpSearch() {
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
