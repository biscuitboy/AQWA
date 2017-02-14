(function(){

'use strict';

/*Directive for OWL Carousel in Weather page*/
angular.module('climateApp')
.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				defaultOptions.navigationText = ["<i class='fa fa-3x fa-arrow-circle-left'></i>","<i class='fa fa-3x fa-arrow-circle-right'></i>"];
					$(element).owlCarousel(defaultOptions);
			};
		}
	};
});

})();