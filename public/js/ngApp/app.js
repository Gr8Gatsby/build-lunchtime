"use strict"

var app = angular.module('lunchtimeApp', ['ngRoute', 'lunchtime.filters']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		controller:'lunchtimeAppController',
		templateUrl: '/partials/restaurants'	
	});

	$locationProvider.html5Mode(true);
}]);

// Global app variable for the timer
var timeUntilLunch = 0;

// Use the requestAnimationFrame for updates
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;


// Create the lunchtime timer
var timeLoop = function() {
	updateModel('timer', function(scope) {
		var now = new Date();

		var secondsPassed = 0;
		var noon = 12 * 3600;

		secondsPassed += ( now.getHours() * 3600 );
		secondsPassed += ( now.getMinutes() * 60 );
		secondsPassed += now.getSeconds();

		var checkTime = noon - secondsPassed;

		if(checkTime < 0) {
			scope.timeUntilLunch = false;
			scope.timeAfterLunch = secondsPassed - noon;
		} else {
			scope.timeUntilLunch = noon - secondsPassed;		
		}

		requestAnimationFrame(timeLoop);
	});
};

// Update the model
function updateModel(element_id, callback) {
	var sc = angular.element(document.getElementById(element_id)).scope();
    
	if(sc){
	    sc.$apply(function(sc){
	        callback(sc);
	    });
    }
}

Number.prototype.toRad = function() {  // convert degrees to radians
  return this * Math.PI / 180;
}


Number.prototype.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
}


Number.prototype.toBrng = function() {  // convert radians to degrees (as bearing: 0...360)
  return (this.toDeg()+360) % 360;
}
