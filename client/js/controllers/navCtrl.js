'use strict';

var app = angular.module('googApp');

app.controller('navCtrl', function($scope, UserService, AuthService, NavService) {
	$scope.$watch(function() {
		return UserService.user;
	},function(user){
		$scope.username = user.username;
		$scope.locations = user.locations;
	});
	
	$scope.logout = function() {
		AuthService.logout();
	};

	$scope.getCoords = function() {
		NavService.getCoords($scope.location.address);
	};

	$scope.removeLocation = function(location) {
		NavService.removeLocation(location);
	}

});