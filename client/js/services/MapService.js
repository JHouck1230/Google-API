'use strict';

var app = angular.module('googApp');

app.service('MapService', function() {
	this.set = function(address) {
		this.locations.push(address);
	};
	this.destroy = function() {
		this.locations = [];
	};
});