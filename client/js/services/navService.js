'use strict';

var app = angular.module('googApp');

app.service('NavService', function($http) {

	this.getCoords = function(address) {
		initMap();
		function initMap() {
		  var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 8,
		    center: {lat: -34.397, lng: 150.644}
		  });
		  var geocoder = new google.maps.Geocoder();
	    geocodeAddress(geocoder, map);
		}

		function geocodeAddress(geocoder, resultsMap) {
		  geocoder.geocode({'address': address}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      resultsMap.setCenter(results[0].geometry.location);
		      var location = {address: results[0].formatted_address};
		      return $http.post('/users/locations', location)
  				.then(function(res) {
  						var marker = new google.maps.Marker({
			        map: resultsMap,
			        position: results[0].geometry.location
  					});
  						return res.data;
  				}, function (err){
  						console.error("err: ",err);
  				})     
		    } else {
		      alert('Geocode was not successful for the following reason: ' + status);
		    }
		  });
		}	
	}




});