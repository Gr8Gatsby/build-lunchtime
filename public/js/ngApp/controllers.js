
// View model for the lunchtime App
app.controller('lunchtimeAppController', function($scope, AppDataService) {
	console.log('lunchtimeAppController started...');
	function init() {
		$scope.steps = false;
		// load the restaurant data from the factory into the view model
		AppDataService.getRestaurants().success(function(data){
			$scope.restaurants = data;
		});
		// load the media attribution data from the factory into the view model
		AppDataService.getMediaAttribution().success(function(data){
			$scope.mediaAttribution = data; 
		});
		// load restaurant data from the factory into the view model
		AppDataService.location().then(function (position) {
			$scope.position = {latitude : position.coords.latitude, longitude : position.coords.longitude };
			$scope.positionLastUpdated = {timestamp: position.timestamp};
			
			AppDataService.getYelpRestaurants(position.coords.latitude, position.coords.longitude).success(function(data) {
				$scope.yelpData = data;
			});

			// Add distance from user to the restaurant data
			for(var each in $scope.restaurants) {
				var loc = $scope.restaurants[each].location;
				// if user location is available
				if(loc) {
					$scope.restaurants[each].distance = $scope.getDistance(loc, $scope.position, 'm');
				}
				else {
					$scope.restaurants[each].distance = 0;	
				}
			}
		// On error
		}, function (reason) {
			console.log(reason);
		});

		// Start the Lunch timer
		requestAnimationFrame(timeLoop);
	};

	init();

	// Calculate Distance between the user and a restaurant
	$scope.getDistance = function(originLocation, destinationLocation, units) {
        if(!originLocation) {
            return NaN;
        }
        
        var R = 0;

        if(units === 'mi'){
            R = 3959;    // miles
        } else if (units === 'km') {
            R = 6371;   // kilometers (default)
        } else if (units === 'ft') {
            R = 20903520;
        } else if (units === 'm') {
            R = 6378100;
        }
        var dLat = (destinationLocation.latitude - originLocation.latitude).toRad();
        var dLon = (destinationLocation.longitude - originLocation.longitude).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(originLocation.latitude.toRad()) * Math.cos(destinationLocation.latitude.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d;
    }
});