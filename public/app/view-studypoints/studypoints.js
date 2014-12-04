'use strict';

angular.module('myAppRename.viewStudypoints', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-studypoints', {
            templateUrl: 'app/view-studypoints/studypoints.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http) {
        var teacherId = $scope.username;
        $http({
            method: 'GET',
            url: 'adminApi/classesByTeacherId/' + teacherId
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

        $scope.updateDailyPoints = function (student,operator){
            var newDayliPoints = 0;
            if (operator == "plus"){
                newDayliPoints = student.dailyPoints + 1;
            }
            if (operator == "minus"){
                newDayliPoints = student.dailyPoints - 1;
            }

            var json = {
                "_id":student._id,
                "dailyPoints":newDayliPoints
            }

            $http
                .post('adminApi/students', json)
                .success(function (data, status, headers, config) {
                    for (var i = 0; i < $scope.classes.length; i++){
                        var students = $scope.classes[i].students;
                        for (var j = 0; j < students.length; j++){
                            if (students[j]._id === student._id){
                                if (operator === "minus"){
                                    students[j].dailyPoints -= 1;
                                } else{
                                    students[j].dailyPoints += 1;
                                }
                                break;
                            }
                        }
                    }
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }

    })
;