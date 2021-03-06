'use strict';

/* Directives */

angular.module('myAppRename.directives', [])
    .directive('angularLinks', function () {
      return {
        restrict: 'AE',
        replace: 'true',
        template:  '<ul style="list-style-type: none">' +
        '<li><a href="http://www.sitepoint.com/practical-guide-angularjs-directives/">A practical Guide</a></li>'+
        '<li><a href="http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals">Creating Custom Directives</a></li>'+
        '</ul>'
      };
    })
    .directive('match', function($parse) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          scope.$watch(function() {
            return $parse(attrs.match)(scope) === ctrl.$modelValue;
          }, function(currentValue) {
            ctrl.$setValidity('mismatch', currentValue);
          });
        }
      };
    })
    .directive('numbersOnly', function(){
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          modelCtrl.$parsers.push(function (inputValue) {
            if (inputValue == undefined) return '';
            var transformedInput = inputValue.replace(/[^0-9+.]/g, '');
            if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
            }

            return transformedInput;
          });
        }
      }
    }
);
