'use strict';

var app = angular.module('googApp');

app.service('AuthService', function($http, $state, UserService) {	

	this.logout = function() {
		$http.delete('/users/authenticate')
		.then(res => {
			UserService.destroy();
			$state.go('home');
		});
	};

  this.register = function(user) {
    return $http.post('/users/register', user)
    .then(res => {
    	UserService.set(res.data)
    	return res.data;
    },
    			err => console.error(err));
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
    .then(res => {
    	UserService.set(res.data)
    	return res.data;
    }, 
    			err => console.error(err));
  };

	// this.init = function() {
	// 	$http.get('/users/profile')
	// 	.then(res => UserService.set(res.data));
	// };

	function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });
  map.addListener('click', function(e) {
    var marker = new google.maps.Marker({
      position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
      map: map
    });
  });
}

});