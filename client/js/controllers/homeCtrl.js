'use strict';

var app = angular.module('googApp');

app.controller('homeCtrl', function($scope, UserService) {
	$scope.$watch(function() {
		return UserService.username;
	},function(username){
		$scope.username = username;
	});
});