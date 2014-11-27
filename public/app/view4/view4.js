'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'app/view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'adminApi/user/' + $scope.username
    }).
      success(function (data, status, headers, config) {
        $scope.personal = data;
         $scope.error = null;
      }).
      error(function (data, status, headers, config) {
        if(status == 401){
          $scope.error ="You are not authenticated to request these data";
            return;
        }
        $scope.error = data;
      });
});



