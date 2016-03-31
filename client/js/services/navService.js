'use strict';

var app = angular.module('googApp');

app.service('NavService', function($http, UserService) {

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
		      return $http.post('/users/locations', location)
  				.then(function(res) {
  					UserService.set(res.data);
						return res.data;
  				}, function (err){
						console.error("err: ",err);
  				})     
		    } else {
		      alert('Geocode was not successful for the following reason: ' + status);
		    }
		  });
		};
	};

	this.removeLocation = function(location) {
		$http.delete(`/users/locations/${location.address}`)
		.then(res => UserService.set(res.data),
					err => console.error(err));
	};

	this.getPhotos = function() {
		return $http.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=2033796677.5b767b5.bcd256e058db4e8ea6e1a4be730a7a91');
	}

});