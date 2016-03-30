'use strict';

var app = angular.module('googApp');

app.controller('navCtrl', function($scope, UserService, AuthService) {
	$scope.$watch(function() {
		return UserService.username;
	},function(username){
		$scope.username = username;
	});
	
	$scope.logout = function() {
		AuthService.logout();
	}

});