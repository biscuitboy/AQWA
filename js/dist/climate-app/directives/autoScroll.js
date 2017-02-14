(function(){

'use strict';

/*Directive for auto scrolling when 'Show Me More' link is clicked on Air Quality page*/
angular.module('climateApp')
.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('click', function() {
        $("body").animate({scrollTop: element[0].offsetTop}, "slow");
      });
    }
  }
});
})();