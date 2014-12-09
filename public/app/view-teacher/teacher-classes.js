'use strict';

angular.module('myAppRename.viewTeacher', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-teacher', {
            templateUrl: 'app/view-teacher/teacher-classes.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http) {
        var teacherId = $scope.username;
        $http({
            method: 'GET',
            url: 'adminApi/getMyClasses/' + "sybilmcguire@maroptic.com"
        })
            .success(function (data) {
                $scope.classes = data;
                $scope.selectedClass = $scope.classes[0];
                $scope.error = null;
            }).
            error(function (data, status) {
                if(status == 401){
                    $scope.error ="You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });


        $scope.getPeriodsByClassId = function (classId){
            $http({
                method: 'GET',
                url: 'adminApi/getPeriodsByClassId/' + classId
            })
                .success(function (data) {
                    $scope.periods = data;
                    $scope.selectedPeriod = $scope.periods[0];
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });

        };

        $scope.getDailyPointsByPeriod = function(periodId){
            $http({
                method: 'GET',
                url: 'adminApi/getDailyPointsByPeriod/' + periodId
            })
                .success(function (data) {
                    $scope.studentsDailyPoints = data;
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });

        };

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
            };

            $http
                .post('adminApi/updateDailyPoints', json)
                .success(function () {
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
                error(function (data, status) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };

        $scope.studentsTotalPoints = function(points){
            console.log(points);
            var sum = 0;
            for(var i in points){
                if (points[i] == true){
                    sum++;
                }
            }
            return sum;
        }


        $scope.removeStudentFromClass = function (studentId){
            $http
                .get('adminApi/removeStudentFromClass/' + studentId)
                .success(function () {
                    for (var i = 0; i < $scope.classes.length; i++){
                        var students = $scope.classes[i].students;
                        for(var j = 0; j < students.length; j++){
                            if(students[j]._id === studentId){
                                students.splice(j,1);
                                break;
                            }
                        }
                    }
                    $scope.error = null;
                }).
                error(function (data, status) {
                    console.log('here?' + data);
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };

        $scope.updatePoints = function () {
            for(var i in $scope.studentsDailyPoints){
                var json = {
                    "studentId": $scope.studentsDailyPoints[i].student._id,
                    "periodId": $scope.studentsDailyPoints[i].period,
                    "dailyPoints": $scope.studentsDailyPoints[i].dailyPoints
                };
                $http
                    .post('adminApi/updateStudentsDailyPoints', json)
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

    })
;