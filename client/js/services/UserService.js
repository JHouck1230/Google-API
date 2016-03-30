'use strict';

var app = angular.module('googApp');

app.service('UserService', function() {
	this.set = function(user) {
		this.username = user.username;
		this._id = user._id;
	};
	this.destroy = function() {
		this.username = null;
		this._id = null;
	};
});