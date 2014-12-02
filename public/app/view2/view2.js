'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'app/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
        //$scope.pws = {
        //    newPw: '',
        //    repeatPw: ''
        //};


        var studentId = $scope.username;
        $http({
            method: 'GET',
            url: 'userApi/students/'+studentId
        })
            .success(function (data, status, headers, config) {
                $scope.user = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        $http({
            method: 'GET',
            url: 'userApi/classesByUserId/'+studentId
        })
            .success(function (data, status, headers, config) {
                $scope.class = data;
                getClass(data);
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });
        $http({
            method: 'GET',
            url: 'userApi/tasksByUserId/'+studentId
        })
            .success(function (data, status, headers, config) {
                $scope.tasks = data;
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
                $scope.error = data;
            });

        var getClass = function (text) {
            var classId = text[0]['_id'];
            $http({
                method: 'GET',
                url: 'userApi/periodsByClassId/' + classId
            })
                .success(function (data, status, headers, config) {
                    $scope.periods = data;
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

        $scope.getTotalPoints = function (tasks) {
            var total = 0;
            for (var i in tasks){
                total += tasks[i].points;
            }
            return total;
        }

        $scope.toggle = true;

        $scope.changePassword = function (pass) {
            var userName = $scope.username;
            var currentPassword =  pass['currentPassword'];
            var newPassword = pass['newPassword'];
            var confirmPassword = pass['confirmPassword']

            var json = {
                "userName": userName,
                "currentPassword": currentPassword,
                "newPassword": newPassword}
            $http
                .post('userApi/change', json)
                .success(function (data, status, headers, config) {
                    $scope.pwMesage = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };
    }]);
