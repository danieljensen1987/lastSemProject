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
                    $scope.addSelectedClass = $scope.classes[0];
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

        $scope.selectedClasses = [];
        $scope.addClassesToNewPeriod = function (classes) {
            for(var i in classes){
                var exists = false;
                for(var j in $scope.selectedClasses){
                    if($scope.selectedClasses[j]._id === classes[i]._id){
                        exists = true;
                    }
                }
                if (exists === false){
                    $scope.selectedClasses.push(classes[i]);
                }
            }

        };
        $scope.removeClassesFromNewPeriod = function (classes){
            for(var i in classes){
                for(var j in $scope.selectedClasses){
                    if($scope.selectedClasses[j] === classes[i]){
                        $scope.selectedClasses.splice(j,1);
                    }
                }
            }
        };

        $scope.addNewPeriod = function (){
            var classes = [];
            for(var i in $scope.selectedClasses){
                classes.push($scope.selectedClasses[i]._id)
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
        //$scope.updateClass = function (){
        //    var updateClass = {
        //        "_id":$scope.editSelectedClass._id,
        //        "students":$scope.editSelectedClass.students,
        //        "teachers":$scope.editSelectedClass.teachers,
        //        semester: $scope.editSelectedClass.semester
        //    };
        //
        //    $http
        //        .post('adminApi/updateClass', updateClass)
        //        .success(function () {
        //            getView();
        //            $scope.error = null;
        //        }).
        //        error(function (data, status) {
        //            if (status == 401) {
        //                $scope.error = "You are not authenticated to request these data";
        //                return;
        //            }
        //            $scope.error = data;
        //        });
        //};



    })
;