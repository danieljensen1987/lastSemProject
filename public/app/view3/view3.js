'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http) {
        $scope.predicate = "id";
        $http({
            method: 'GET',
            url: 'adminApi/students'
        })
            .success(function (data, status, headers, config) {
                $scope.users = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if(status == 401){
                    $scope.error ="You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });
        $scope.getClasses =  function () {
            var output = [];

            $scope.users.forEach(function(item) {
                if(output.filter(function(x) {return x === item.class;}).length <= 0) {
                    output.push(item.class);
                }
            });

            return output;
        }

        $scope.getSum = function (tasks) {
            var sum = 0;
            for (var x in tasks){
                sum += tasks[x].points;

            }
            return sum;
        }






    })
;