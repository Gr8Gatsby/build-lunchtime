app.factory('AppDataService', function($http, $q, $window, $rootScope) {
	var factory = {};
	// Get the restaurant data
    factory.getRestaurants = function() {
		return $http.get('/restaurants');
	};
    // Get media attribution data
    factory.getMediaAttribution = function() {
        return $http.get('/mediaAttribution');
    };

	// Get the user location from Browser geolocation object
	factory.location = function(){
		var deferred = $q.defer();

        if (!$window.navigator) {
            $rootScope.$apply(function() {
                deferred.reject(new Error("Geolocation is not supported"));
            });
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                // Success
                function (position) {
                $rootScope.$apply(function() {
                    deferred.resolve(position);
                });
            //Error
            }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            },
            //Options
            {enableHighAccuracy:true});
        }

        return deferred.promise;
	}

	// Get the user preferences
	factory.preferences = function(){
		return $http.get('/preferences');
	}

    factory.getYelpRestaurants = function(latitude,longitude) {
        var yelpData = $http.get('/yelpSearch/' + latitude + '/' + longitude);
        return yelpData;
    }

	return factory;
});