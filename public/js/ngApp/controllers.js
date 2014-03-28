
// View model for the lunchtime App
app.controller('lunchtimeAppController', function($scope, AppDataService) {
	console.log('lunchtimeAppController started...');
	function init() {
		AppDataService.getRestaurants().success(function(data){
			$scope.restaurants = data;
		});

		AppDataService.location().then(function (position) {
			$scope.position = {latitude : position.coords.latitude, longitude : position.coords.longitude };
			$scope.positionLastUpdated = {timestamp: position.timestamp};
			console.log(position.timestamp + ': ' + position.coords.latitude + ',' + position.coords.longitude);
		// On error
		}, function (reason) {
			console.log(reason);
		});

		// Start the Lunch timer
		requestAnimationFrame(timeLoop);
	};

	init();
});