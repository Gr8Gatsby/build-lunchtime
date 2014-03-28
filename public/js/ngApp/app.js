"use strict"

var app = angular.module('lunchtimeApp', ['ngRoute', 'lunchtime.filters']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/lunch', {
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

// Calculate Distance between the user and a restaurant
var getDistance = function(originLocation, destinationLocation, units) {
        if(!originLocation) {
            return NaN;
        }
        var R;
        if(units === 'mi'){
            R = 3959;    // miles
        } else if (units === 'km') {
            R = 6371;   // kilometers (default)
        } else if (units === 'ft') {
            R = 20903520;
        }
        var dLat = (destinationLocation.latitude - originLocation.latitude).toRad();
        var dLon = (destinationLocation.longitude - originLocation.longitude).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(originLocation.latitude.toRad()) * Math.cos(destinationLocation.latitude.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d;
        //return ({'distance': d, 'units': units});
    }
