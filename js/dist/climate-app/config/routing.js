(function(){

'use strict';

angular.module('climateApp')
.config([ '$routeProvider', function($routeProvider) {
  //$locationProvider.hashPrefix('!');
 $routeProvider
   .when('/', {
    templateUrl: 'home.html',
    controller: 'climateAppCtrl',
  })
  .when('/airQuality', {
    templateUrl: 'airQuality.html',
    controller: 'climateAppCtrl'
  })
  .when('/weather', {
    templateUrl: 'weather.html',
    controller: 'climateAppCtrl'
  })
  .when('/404', {
	 templateUrl: '404.html',
    controller: 'climateAppCtrl'
  });
  
  $routeProvider.otherwise({
	redirectTo: '/'
  });
}]);
})();