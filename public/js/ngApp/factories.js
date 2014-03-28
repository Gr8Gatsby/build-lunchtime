app.factory('AppDataService', function($http, $q, $window, $rootScope) {
	var factory = {};
	factory.getRestaurants = function() {
		return $http.get('/restaurants');
	};

	// Get the user location from Browser geolocation object
	factory.location = function(){
		var deferred = $q.defer();

        if (!$window.navigator) {
            $rootScope.$apply(function() {
                deferred.reject(new Error("Geolocation is not supported"));
            });
        } else {
            $window.navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function() {
                    deferred.resolve(position);
                });
            }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            });
        }

        return deferred.promise;
	}

	// Get the user preferences
	factory.preferences = function(){
		return $http.get('/preferences');
	}

	return factory;
});