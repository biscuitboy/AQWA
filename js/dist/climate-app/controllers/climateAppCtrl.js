(function(){

'use strict';

angular.module('climateApp')
.controller('climateAppCtrl', climateAppCtrl);

climateAppCtrl.$inject = ['$scope', '$rootScope', '$http', '$location', '$anchorScroll', 'settings'];

function climateAppCtrl($scope, $rootScope, $http, $location, $anchorScroll, settings ){

	// declare scope variables
	
	// assign out of range values for latitude and longitude
	$scope.lat = 91;
	$scope.lng = 181;
	
	$scope.showStaticMap = false;
	$scope.showAirQuality = false;
	$scope.airQualityError = false;
	$scope.showAllAirQADetails = false;
	$scope.geoCodeError = false	;
	$rootScope.showLoader = false;
	$scope.getStaticMap = true;
	$scope.showForecast = false;
	$scope.airQualityDelivered = false;
	
	var tempWeatherObject={
        "temp_f":"",
        "temp_c":"",
        "relative_humidity":"",
        "weather":"",
        "feelslike_f":"",
        "feelslike_c":"",
        "icon":"",
        "wind_mph":"",
        "wind_kph":"",
        "full_name":"",
        "country":"",
        "day":""
    };
	// for mapping Weather Underground icons to Custom icons
	$scope.iconMap = settings.weatherIconMapping ;
	
	// for gauge 
	$scope.gaugeOptions = settings.gaugeDefaultOptions;
		
	// scope level functions - START
	$scope.airQuality = function(){
		$location.path('airQuality');
	}
	/*Function to get AIR QUALITY*/
	$scope.getAirQuality = function(){
		$rootScope.showLoader = true;
		$scope.currentLocation = angular.copy($scope.staticLocation);
		var air_api = 'https://api.breezometer.com/baqi/?lat='+$scope.lat+'&lon='+$scope.lng+'&key='+settings.apiKeys.breezo_api_key;
		var resolved_air_api =  encodeURI(air_api);
		$http.get(resolved_air_api)
            .success(function (data, status, headers, config) {
            //console.log('HTTP Status:' + status);
			//console.log(data);
			if(status >=200 && status < 300 && data.data_valid){
				$rootScope.showLoader = false;
				$scope.airQualityError = false;
				$scope.showAirQuality = true;
				$scope.airQa = data;
				$scope.airQualityDelivered = true;
				$scope.gaugeOptions.colorStart = data.breezometer_color;
				$scope.gaugeOptions.colorStop = data.breezometer_color;
			}
			else if(status >=200 && status < 300 && !data.data_valid){
				$rootScope.showLoader = false;	
				$scope.showAirQuality = false;
				$scope.airQualityError = true;
				$scope.showAllAirQADetails = false;
				$scope.airQualityErrorMsg = data.error.message;
				$scope.airQualityDelivered = true;
			}
			else{
				$location.path('404');
			}
        }) .error(function (data, status, headers, config) {
			$rootScope.showLoader = false;
            console.log('HTTP Status:' + status);
			$location.path('404');
        });
	}
	
	
	/*Function to draw Maps based on LOCATION */
	$scope.getLocation = function(){
	$scope.airQualityDelivered = false;
	$scope.showStaticMap = false;
	$scope.staticLocation = angular.copy($scope.location);
	$scope.showAirQuality = false;
	$scope.showAllAirQADetails = false;
	$rootScope.showLoader = true;
	$scope.airQualityError = false;
    $scope.locationAjax().success(function (data, status, headers, config) {
			if(200 == status){
				$rootScope.showLoader = false;
				if(data.status == 'OK'){
					$scope.geoCodeError =false;
					$scope.showStaticMap = true;
					$scope.lat =  data.results[0].geometry.location.lat;
					$scope.lng =  data.results[0].geometry.location.lng;
					if($scope.getStaticMap){
						var staticMapUrl =  "http://maps.google.com/maps/api/staticmap?center="+$scope.lat+","+$scope.lng+"&markers=color:red|"+$scope.lat+","+$scope.lng+"&zoom=15&size=400x400&sensor=false&key="+ settings.apiKeys.google_maps_api_key;
						$scope.resolvedMapUrl = encodeURI(staticMapUrl);
					}
				}
				else if(data.status == 'ZERO_RESULTS'){
					$scope.geoCodeError = true;
					$scope.showStaticMap = false;
				}
				else{
					$location.path('404');
				}
			}
        }) .error(function (data, status, headers, config) {
				$rootScope.showLoader = false;
				console.log('HTTP Status:' + status);
				$location.path('404');
        });
	};
	
	/*Function to get WEATHER FORECAST*/
	$scope.getWeatherForecast = function(){
		$scope.showForecast = false;
		$rootScope.showLoader = true;
		$scope.locationAjax().success(function (data, status, headers, config) {
						if(200 == status){
							//$rootScope.showLoader = false;
							if(data.status == 'OK'){
								$scope.lat =  data.results[0].geometry.location.lat;
								$scope.lng =  data.results[0].geometry.location.lng;
								var wunderground_endpoint = 'http://api.wunderground.com/api/'+settings.apiKeys.wunderground_api_key+'/conditions/forecast/q/'+$scope.lat+','+$scope.lng+'.json';
								var encoded_uri = encodeURI(wunderground_endpoint);
								$http.get(encoded_uri)
									.success(function (data, status, headers, config) {
									if(200 == status){
										if(data){
											$scope.showForecast = true;
											$scope.geoCodeError = false;
											$scope.weatherMaster = data;
											tempWeatherObject.temp_f = $scope.weatherMaster.current_observation.temp_f;
											tempWeatherObject.temp_c = $scope.weatherMaster.current_observation.temp_c;
											tempWeatherObject.relative_humidity = $scope.weatherMaster.current_observation.relative_humidity;
											tempWeatherObject.weather = $scope.weatherMaster.current_observation.weather;
											tempWeatherObject.feelslike_f = $scope.weatherMaster.current_observation.feelslike_f;
											tempWeatherObject.feelslike_c = $scope.weatherMaster.current_observation.feelslike_c;
											tempWeatherObject.icon = $scope.weatherMaster.current_observation.icon;
											tempWeatherObject.wind_mph = $scope.weatherMaster.current_observation.wind_mph;
											tempWeatherObject.wind_kph = $scope.weatherMaster.current_observation.wind_kph;
											tempWeatherObject.full_name = $scope.weatherMaster.current_observation.display_location.full;
											tempWeatherObject.country = $scope.weatherMaster.current_observation.display_location.country;
											tempWeatherObject.day = $scope.weatherMaster.forecast.simpleforecast.forecastday[0].date.weekday;
											
											$scope.arrayOfSorted = [];
											$scope.arrayOfSorted.push(tempWeatherObject);
											angular.forEach($scope.weatherMaster.forecast.simpleforecast.forecastday , function(value,key){
												if(key>0){
													var tempObject={};
													tempObject.temp_f = value.high.fahrenheit;
													tempObject.temp_c = value.high.celsius;
													tempObject.relative_humidity = value.avehumidity + "%";
													tempObject.weather = value.conditions;
													tempObject.feelslike_f = value.high.fahrenheit;
													tempObject.feelslike_c = value.high.celsius;
													tempObject.icon = value.icon;
													tempObject.wind_mph = value.maxwind.mph;
													tempObject.wind_kph = value.maxwind.kph;
													tempObject.full_name = $scope.weatherMaster.current_observation.display_location.full;
													tempObject.country = $scope.weatherMaster.current_observation.display_location.country;
													tempObject.day = value.date.weekday;
													$scope.arrayOfSorted.push(tempObject);
												}
									});
							}
							$rootScope.showLoader = false;
							}
					}) .error(function (data, status, headers, config) {
							$rootScope.showLoader = false;
							console.log('HTTP Status:' + status);
							$location.path('404');
					});
				}
				else if(data.status == 'ZERO_RESULTS'){
					$rootScope.showLoader = false;
					$scope.geoCodeError = true;
					$scope.showForecast = false;
				}
				else{
					$rootScope.showLoader = false;
					$location.path('404');
				}
			}
        }) .error(function (data, status, headers, config) {
				$rootScope.showLoader = false;
				console.log('HTTP Status:' + status);
				$location.path('404');
        });	
	}
	
	/*Function to get  LATITUDE and LONGITUDE based on LOCATION  */
	$scope.locationAjax = function(){
		var url_endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.location +'&key='+ settings.apiKeys.google_maps_api_key ;
		var resolved_url = encodeURI(url_endpoint);
		return $http.get(resolved_url);
	}
	
	$scope.showAllDetails = function(){
		$scope.showAllAirQADetails = !$scope.showAllAirQADetails;
	}
	
	$scope.submitOnEnter = function(event, type){
		if(event.charCode == 13 && type==1){
			$scope.getLocation();
		}
		else if(event.charCode == 13 && type==2){
			$scope.getWeatherForecast();
		}
	}
	$scope.weatherForecast = function(){
			$location.path('weather');
	}
	
  }
})();