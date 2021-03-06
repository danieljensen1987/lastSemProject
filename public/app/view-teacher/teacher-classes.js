'use strict';

angular.module('myAppRename.viewTeacher', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-teacher', {
            templateUrl: 'app/view-teacher/teacher-classes.html',
            controller: 'ViewTeacherCtrl'
        });
    }])

    .controller('ViewTeacherCtrl', function ($scope, $http) {
        //var teacherId = $scope.username;
        $scope.days = [
            'mo','tu','we','th','fr','mo','tu','we','th','fr','mo','tu','we','th','fr',
            'mo','tu','we','th','fr','mo','tu','we','th','fr','mo','tu','we','th','fr'];
        $scope.weeks = ['1','2','3','4','5','6'];
        var teacherId = "sybilmcguire@maroptic.com";
        $http({
            method: 'GET',
            url: 'adminApi/getMyClasses/' + teacherId
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

        $scope.getPeriodsByClassId = function (classId){
            $http({
                method: 'GET',
                url: 'adminApi/getPeriodsByClassId/' + classId
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

        $scope.studentsTotalPoints = function(points){
            var sum = 0;
            for(var i in points){
                if (points[i] == true){
                    sum++;
                }
            }
            return sum;
        };


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