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

        $scope.addSelectedClasses = [];
        $scope.addClassesToNewPeriod = function (classes) {
            for(var i in classes){
                var exists = false;
                for(var j in $scope.addSelectedClasses){
                    if($scope.addSelectedClasses[j]._id === classes[i]._id){
                        exists = true;
                    }
                }
                if (exists === false){
                    $scope.addSelectedClasses.push(classes[i]);
                }
            }

        };
        $scope.removeClassesFromNewPeriod = function (classes){
            for(var i in classes){
                for(var j in $scope.addSelectedClasses){
                    if($scope.addSelectedClasses[j] === classes[i]){
                        $scope.addSelectedClasses.splice(j,1);
                    }
                }
            }
        };
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
            var classes = [];
            for(var i in $scope.addSelectedClasses){
                classes.push($scope.addSelectedClasses[i]._id)
            }
            var newPeriod = {
                "_id":$scope.addId,
                "description":$scope.addDescription,
                "sDate": $scope.addSdate,
                "eDate": $scope.addEdate,
                "maxPoints": $scope.addMaxPoints,
                "requiredPoints": $scope.addRequiredPoints,
                "classes": classes
            };


            $http
                .post('adminApi/addPeriod', newPeriod)
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