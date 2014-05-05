angular.module('lunchtime.filters',[]).
	filter('time', function() {
  	return function (input) {
  		var hours = 0;
  		var minutes = 0;
  		var seconds = 0;
  		var timeString = '';

  		if(input > 3600) {
  			hours = Math.floor(input / 3600);
  		}
  		
  		if(input > 60) {
  			minutes = Math.floor((input - (3600 * hours)) / 60);
  		}

  		seconds = Math.floor(input - (3600 * hours) - (60 * minutes));

  		if(hours > 0) {
  			timeString += hours.toString();
  			timeString += ' hour';
  			if(hours > 1) {
  				timeString += 's';
  			}
  		} 

  		if(minutes > 0) {
  			timeString += ' ' + minutes.toString();
  			timeString += ' minute';
  			if(minutes > 1) {
  				timeString += 's';
  			}
  		}

  		if(seconds > 0) {
  			timeString += ' ' + seconds.toString();
  			timeString += ' second';
  			if(seconds > 1) {
  				timeString += 's';
  			}
  		}

  		return timeString;
  	};
  }).filter('steps', function() {
    return function(input, units) {
          
          var averageStepsPerMile = 2514;

          if(units === 'mi'){
              return input * averageStepsPerMile;    // miles
          } else if (units === 'km') {
              return input * (averageStepsPerMile / 1.609344);   // kilometers (default)
          } else if (units === 'ft') {
              return input * (averageStepsPerMile / 5280)
          } else if (units === 'm') {
              return input * (averageStepsPerMile / 1609.344);
          }
      
      };
  });
