'use strict';

var app = angular.module('googApp');

app.controller('navCtrl', function($scope, UserService, AuthService, NavService) {
	$scope.$watch(function() {
		return UserService.username;
	},function(username){
		$scope.username = username;
	});
	
	$scope.logout = function() {
		AuthService.logout();
	};

	$scope.getCoords = function() {
		NavService.getCoords($scope.location.address);
	};

});