'use strict';

angular.module('myAppRename.viewAddEditPeriod', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add-edit-period', {
            templateUrl: 'app/view-add-edit-period/add-edit-period.html',
            controller: 'View6Ctrl'
        });
    }])

    .controller('View6Ctrl', function ($scope, $http) {

        getView();
        function getView(){
            $http({
                method: 'GET',
                url: 'adminApi/getClasses/'
            })
                .success(function (data) {
                    $scope.classes = data;
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
            $http({
                method: 'GET',
                url: 'adminApi/getPeriods/'
            })
                .success(function (data) {
                    $scope.periods = data;
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }

        $scope.addClassesToSelectedPeriod = function (classes) {
            for(var i in classes){
                var exists = false;
                for(var j in $scope.editSelectedPeriod.classes){
                    if($scope.editSelectedPeriod.classes[j] === classes[i]._id){
                        exists = true;
                    }
                }
                if (exists === false){
                    $scope.editSelectedPeriod.classes.push(classes[i]._id);
                }
            }

        };
        $scope.removeClassesFromSelectedPeriod = function (classes){
            for(var i in classes){
                for(var j in $scope.editSelectedPeriod.classes){
                    if($scope.editSelectedPeriod.classes[j] === classes[i]){
                        $scope.editSelectedPeriod.classes.splice(j,1);
                    }
                }
            }
        };

        $scope.addNewPeriod = function (){
            var sDate = $scope.newPeriod.sDate;
            var eDate = $scope.newPeriod.eDate;
            var periodLength =  Math.floor((Date.parse(eDate) - Date.parse(sDate))/1000/60/60/24);
            var dailyPoints = new Array(periodLength);
            for (var i = 0; i < dailyPoints.length; ++i) {
                dailyPoints[i] = false;
            }
            for(var i in $scope.classes){
                if($scope.classes[i]._id == $scope.newPeriod.classes){
                    for(var j in $scope.classes[i].students){
                        var json = {
                            "period":$scope.newPeriod._id,
                            "student":$scope.classes[i].students[j],
                            "dailyPoints":dailyPoints
                        }
                        $http
                            .post('adminApi/addDailyPoints', json)
                            .success(function () {
                                $scope.error = null;
                            }).
                            error(function (data, status) {
                                if (status == 401) {
                                    $scope.error = "You are not authenticated to request these data";
                                    return;
                                }
                                $scope.error = data;
                            });
                    }
                }
            }

            $http
                .post('adminApi/addPeriod', $scope.newPeriod)
                .success(function () {
                    getView();
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };
        $scope.updatePeriod = function (){
            var updatePeriod = {
                "_id": $scope.editSelectedPeriod._id,
                "description": $scope.editSelectedPeriod.description,
                "sDate": $scope.editSelectedPeriod.sDate,
                "eDate": $scope.editSelectedPeriod.eDate,
                "maxPoints": $scope.editSelectedPeriod.maxPoints,
                "requiredPoints": $scope.editSelectedPeriod.requiredPoints,
                "classes": $scope.editSelectedPeriod.classes
            };

            $http
                .post('adminApi/updatePeriod', updatePeriod)
                .success(function () {
                    getView();
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };



    })
;