'use strict';

angular.module('myAppRename.viewAdmin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-admin', {
            templateUrl: 'app/view-admin/admin.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'adminApi/semesters'
        })
            .success(function (data, status, headers, config) {
                $scope.semesters = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if(status == 401){
                    $scope.error ="You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $scope.getClasses = function (semesterId){
            $http({
                method: 'GET',
                url: 'adminApi/classesBySemesterId/' + semesterId
            })
                .success(function (data, status, headers, config) {
                    $scope.classes = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }

        var getClass = function (classeId){
            $http({
                method: 'GET',
                url: 'adminApi/classesById/' + classeId
            })
                .success(function (data, status, headers, config) {
                    $scope.classe = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }
    })
;