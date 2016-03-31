'use strict';

var app = angular.module('googApp');

app.service('NavService', function($http) {

	this.getCoords = function(address) {
    geocodeAddress();
		function geocodeAddress() {
		  var geocoder = new google.maps.Geocoder();
		  geocoder.geocode({'address': address}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      var location = {
		      	address: results[0].formatted_address,
		      	lat: results[0].geometry.location.lat(),
		      	lng: results[0].geometry.location.lng()
		      };
		      console.log('location: ', location);
		      return $http.post('/users/locations', location)
  				.then(function(res) {
  					console.log('res.data: ', res.data)
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