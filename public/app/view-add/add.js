'use strict';

angular.module('myAppRename.viewAdd', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add', {
            templateUrl: 'app/view-add/add.html'
        });
    }])

    .controller('AddCtrl', function ($scope, $http, $route, SuccessMessage) {
        $scope.succes = SuccessMessage;
    })


    .controller('AddClassCtrl', function ($scope, $http, $route, SuccessMessage) {


        getView();
        function getView(){
            $http({
                method: 'GET',
                url: 'adminApi/getSemesters/'
            })
                .success(function (data) {
                    $scope.semesters = data;
                    $scope.addSelectedSemester = $scope.semesters[0];
                    $scope.error = null;
                }).
                error(function (data, status) {
                    if(status == 401){
                        $scope.error ="You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });

            //$http({
            //    method: 'GET',
            //    url: 'adminApi/getClasses/'
            //})
            //    .success(function (data) {
            //        $scope.classes = data;
            //        $scope.addSelectedClass = $scope.classes[0];
            //        $scope.error = null;
            //    }).
            //    error(function (data, status) {
            //        if(status == 401){
            //            $scope.error ="You are not authenticated to request these data";
            //            return;
            //        }
            //        $scope.error = data;
            //    });

            $http({
                method: 'GET',
                url: 'adminApi/getStudents/'
            })
                .success(function (data) {
                    $scope.students = data;
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
                url: 'adminApi/getTeachers/'
            })
                .success(function (data) {
                    $scope.teachers = data;
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

        $scope.addNewClass = function (){
            var selectedStudents = [];
            var selectedTeachers = [];
            for (var i in $scope.addSelectedStudent){
                selectedStudents.push($scope.addSelectedStudent[i]._id);
            }
            for (var i in $scope.addSelectedTeacher){
                selectedTeachers.push($scope.addSelectedTeacher[i]._id);
            }
            var newClass = {
                "_id":$scope.addId,
                "students":selectedStudents,
                "teachers":selectedTeachers,
                semester:$scope.addSelectedSemester._id
            };

            $http
                .post('adminApi/addClass', newClass)
                .success(function () {
                    $route.reload();
                    SuccessMessage.message = "New class: " + newClass._id + " added.";
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

    .controller('AddPeriodCtrl', function ($scope, $http, $route, SuccessMessage) {

        getView();
        function getView(){
            $http({
                method: 'GET',
                url: 'adminApi/getClasses/'
            })
                .success(function (data) {
                    $scope.classes = data;
                    $scope.newPeriod = {};
                    $scope.newPeriod.classes = $scope.classes[0]._id;
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
                    $route.reload();
                    SuccessMessage.message = "New period: " + $scope.newPeriod._id + " added.";
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

    .controller('AddUserCtrl', function ($scope, $http, $route, SuccessMessage) {
        var randomNumber = 0;

        var getRandomNumber = function(){
            randomNumber = Math.floor((Math.random()*899)+100);
        };
        getRandomNumber();
        $scope.newUser = {};
        $scope.roles = ['Admin','Teacher','Student'];
        $scope.newUser.roleName = $scope.roles[0];

        $scope.addNewUser = function () {
            var newUser = {
                _id: $scope.newUser.roleName.toLowerCase().substr(0,[3]) + randomNumber + "-" +
                $scope.newUser.fName.toLowerCase().substr(0,[3]) + $scope.newUser.lName.toLowerCase().substr(0,[3]),
                fName:$scope.newUser.fName,
                lName:$scope.newUser.lName,
                address:$scope.newUser.address,
                city:$scope.newUser.city,
                zip:$scope.newUser.zip,
                phone:$scope.newUser.phone,
                email:$scope.newUser.email,
                role:$scope.newUser.roleName.toLowerCase(),
                dailyPoints:0
            };

            $http
                .post('adminApi/addUser', newUser)
                .success(function () {
                    $route.reload();
                    SuccessMessage.message = "New " + $scope.newUser.roleName.toLowerCase() + " added with ID: " +  newUser._id;
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