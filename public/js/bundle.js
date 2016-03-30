"use strict";function initMap(){var e=new google.maps.Map(document.getElementById("map"),{center:{lat:0,lng:0},zoom:3,styles:[{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"transit.station",stylers:[{visibility:"off"}]}],disableDoubleClickZoom:!0});e.addListener("click",function(t){new google.maps.Marker({position:{lat:t.latLng.lat(),lng:t.latLng.lng()},map:e})})}var app=angular.module("googApp",["ui.router"]);app.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("home",{url:"/",templateUrl:"/html/home.html",controller:"homeCtrl"}).state("login",{url:"/login",templateUrl:"/html/login.html",controller:"loginCtrl"}),t.otherwise("/")}]);var app=angular.module("googApp");app.controller("homeCtrl",["$scope","UserService",function(e,t){e.$watch(function(){return t.username},function(t){e.username=t})}]);var app=angular.module("googApp");app.controller("loginCtrl",["$scope","$state","AuthService",function(e,t,n){e.login=function(e){n.login(e).then(function(e){t.go("home")},function(e){console.error("err: ",e)})},e.register=function(e){n.register(e).then(function(e){t.go("home")},function(e){console.error("err: ",e)})}}]);var app=angular.module("googApp");app.service("AuthService",["$http","$state","UserService",function(e,t,n){this.logout=function(){e["delete"]("/users/authenticate").then(function(e){n.destroy(),t.go("home")})},this.register=function(t){return e.post("/users/register",t).then(function(e){return n.set(e.data),e.data},function(e){return console.error(e)})},this.login=function(t){return e.post("/users/authenticate",t).then(function(e){return n.set(e.data),e.data},function(e){return console.error(e)})}}]);var app=angular.module("googApp");app.service("UserService",function(){this.set=function(e){this.username=e.username,this._id=e._id},this.destroy=function(){this.username=null,this._id=null}});
//# sourceMappingURL=bundle.js.map
