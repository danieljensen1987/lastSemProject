'use strict';

angular.module('myAppRename.viewAll', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view-all', {
    templateUrl: 'app/view-all/home.html'
  });
}])

.controller('View1Ctrl', function() {
});