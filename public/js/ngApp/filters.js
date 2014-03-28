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
  });
