'use strict';

angular.module('myAppRename.viewStudent', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view-student', {
            templateUrl: 'app/view-student/student-profile.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
        var studentId = $scope.username;
        //var studentId = "vincentpena@maroptic.com";
        $http({
            method: 'GET',
            url: 'userApi/getMyProfile/'+studentId
        })
            .success(function (data) {
                $scope.user = data;
                $scope.error = null;
            }).
            error(function (data, status) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $http({
            method: 'GET',
            url: 'userApi/getMyClass/'+studentId
        })
            .success(function (data) {
                $scope.class = data;
                getPeriods(data);
                $scope.error = null;
            }).
            error(function (data, status) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $http({
            method: 'GET',
            url: 'userApi/getMyTasks/'+studentId
        })
            .success(function (data) {
                $scope.tasks = data;

                $scope.error = null;
            }).
            error(function (data, status) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $http({
            method: 'GET',
            url: 'userApi/getMyDailyPoints/'+studentId
        })
            .success(function (data) {
                $scope.dailyPoints = data;
                $scope.error = null;
            }).
            error(function (data, status) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        var getPeriods = function (text) {
            var classId = text[0]['_id'];
            $http({
                method: 'GET',
                url: 'userApi/getMyPeriods/' + classId
            })
                .success(function (data) {
                    $scope.periods = data;
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

        $scope.getTotalPoints = function (points,tasks, period) {
            var sum = 0;
            for(var i in points){
                if (points[i] == true){
                    sum++;
                }
            }
            for (var i in tasks){
                if(tasks[i].taskDetails.period == period){
                    sum += tasks[i].points;
                }
            }
            return sum;
        };

        $scope.getTotalDailyPointsForPeriod = function (points) {
            var sum = 0;
            for(var i in points){
                if (points[i] == true){
                    sum++;
                }
            }
            return sum;
        };

        $scope.toggle = true;

        $scope.changePassword = function (pass) {
            var userName = $scope.username;
            var currentPassword =  pass['currentPassword'];
            var newPassword = pass['newPassword'];
            var confirmPassword = pass['confirmPassword'];

            var json = {
                "userName": userName,
                "currentPassword": currentPassword,
                "newPassword": newPassword};
            $http
                .post('userApi/changePassword', json)
                .success(function () {
                    $scope.pwMesage = 'Succes!';
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
    }]);
