"use strict"

var app = angular.module('lunchtimeApp', ['ngRoute', 'lunchtime.filters', 'angularAddToHomeScreen']);
app.directive('heightSelector', function () {
        return { 
            restrict: 'A',
            template: "<span ng-repeat='inch in inches' ng-class='inch'>" +
                "<span ng-click=\"toggle($index)\"><img ng-class='inch' ng-style=\"{'height':{{$index * factor + 25}}+'px','vertical-align':'bottom'}\" src='img/person.png'/></span>" +
                '</span>'
            ,
            scope: {
                heightValue: '=',
                max: '=',
                factor: '=',
                onHeightChange: '&'
            },
            link: function (scope, elem, attrs) {
                var updateHeight = function () {
                    scope.inches = [];

                    for (var i = 0; i < scope.max; i++) {
                        scope.inches.push({ selected: i < scope.heightValue });
                    }
                };
                console.log("Recognized the height-selector directive");
            
                scope.$watch('heightValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateHeight();
                    } 
                });

                scope.toggle = function (index) {
                    scope.heightValue = index + 1;
                    scope.onHeightChange({position:index});
                };
                // Set Default
                scope.heightValue = 3;
            }
        }
    });

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		controller:'lunchtimeAppController',
		templateUrl: '/partials/restaurants'	
	}).when('/media', {
		controller:'lunchtimeAppController',
		templateUrl: '/partials/mediaAttribution'	
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
};

Number.prototype.toRad = function() {  // convert degrees to radians
  return this * Math.PI / 180;
};

Number.prototype.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
};

Number.prototype.toBrng = function() {  // convert radians to degrees (as bearing: 0...360)
  return (this.toDeg()+360) % 360;
};