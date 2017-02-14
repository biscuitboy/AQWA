(function(){

'use strict';

/*Constants for the climate APP*/
angular.module('climateApp').constant('settings',{

apiKeys:{
		google_maps_api_key: 'YOUR_GOOGLE_MAPS_API_KEY',
		breezo_api_key:'YOUR_BREEZOMETER_API_KEY',
		wunderground_api_key:'YOUR_WEATHER_UNDERGROUND_API_KEY'
	
},
weatherIconMapping : {
        "partlycloudy":"wi wi-day-sunny-overcast",
        "nt_partlycloudy":"wi wi-night-partly-cloudy",
        "clear":"wi wi-day-sunny",
        "nt_clear":"wi wi-night-clear",
        "rain":"wi wi-day-rain",
        "nt_rain":"wi wi-night-alt-rain",
        "mostlycloudy":"wi wi-day-cloudy",
        "nt_mostlycloudy":"wi wi-night-alt-cloudy",
		"mostlysunny":"wi wi-day-sunny",
		"partlysunny":"wi wi-day-cloudy",
		"hazy":"wi wi-day-haze",
		"nt_hazy":"wi wi-night-fog",
		"cloudy": "wi wi-day-cloudy-high",
		"nt_cloudy": "wi wi-night-cloudy-high",
		"flurries":"wi wi-day-cloudy-gusts",
		"nt_flurries":"wi wi-night-cloudy-gusts",
		"chancerain":"wi wi-day-rain-mix",
		"nt_chancerain":"wi wi-night-rain-mix",
		"chanceflurries":"wi wi-day-snow-wind",
		"nt_chanceflurries":"wi wi-night-snow-wind",
		"chancesleat":"wi wi-day-sleet",
		"nt_chancesleat":"wi wi-night-sleet",
		"chancesnow":"wi wi-day-snow-wind",
		"nt_chancesnow":"wi wi-night-snow-wind",
		"chancetstorms":"wi wi-day-storm-showers",
		"nt_chancetstorms":"wi wi-night-storm-showers",
		"sleet":"wi wi-sleet",
		"nt_sleet":"wi wi-night-sleet",
		"snow":"wi wi-day-snow",
		"nt_snow":"wi wi-night-snow",
		"tstorms":"wi wi-day-thunderstorm",
		"nt_tstorms":"wi wi-night-thunderstorm",
		"sunny":"wi wi-day-sunny",
		"nt_sunny":"wi wi-night-clear",
		"unknown":"wi wi-na",
		"nt_unknown":"wi wi-na",
		"" : "wi wi-alien"
		},
gaugeDefaultOptions : {
	  lines: 12, // The number of lines to draw
	  angle: 0.15, // The length of each line
	  lineWidth: 0.44, // The line thickness
	  pointer: {
		length: 0.9, // The radius of the inner circle
		strokeWidth: 0.035, // The rotation offset
		color: '#FF0000' // Fill color
	  },
	  limitMax: true,   // If true, the pointer will not go past the end of the gauge
	  colorStart: '#6FADCF',   // Colors
	  colorStop: '#8FC0DA',    // just experiment with them
	  strokeColor: '#E0E0E0',   // to see which ones work best for you
	  generateGradient: true,
	  maxValue: 100
	}
});

})();