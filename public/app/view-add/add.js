'use strict';

angular.module('myAppRename.viewAdd', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add', {
            templateUrl: 'app/view-add/add.html'
        });
    }])

    .controller('AddClassCtrl', function ($scope, $http, $route) {
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

        //$scope.addStudentToClass = function (students) {
        //    for(var i in students){
        //        var exists = false;
        //        for(var j in $scope.editSelectedClass.students){
        //            if($scope.editSelectedClass.students[j] === students[i]._id){
        //                exists = true;
        //            }
        //        }
        //        if (exists === false){
        //            $scope.editSelectedClass.students.push(students[i]._id);
        //        }
        //    }
        //
        //};
        //$scope.removeStudentFromClass = function (students){
        //    for(var i in students){
        //        for(var j in $scope.editSelectedClass.students){
        //            if($scope.editSelectedClass.students[j] === students[i]){
        //                $scope.editSelectedClass.students.splice(j,1);
        //            }
        //        }
        //    }
        //};
        //$scope.addTeacherToClass = function (teachers) {
        //    for(var i in teachers){
        //        var exists = false;
        //        for(var j in $scope.editSelectedClass.teachers){
        //            if($scope.editSelectedClass.teachers[j] === teachers[i]._id){
        //                exists = true;
        //            }
        //        }
        //        if (exists === false){
        //            $scope.editSelectedClass.teachers.push(teachers[i]._id);
        //        }
        //    }
        //
        //};
        //$scope.removeTeacherFromClass = function (teachers){
        //    for(var i in teachers){
        //        for(var j in $scope.editSelectedClass.teachers){
        //            if($scope.editSelectedClass.teachers[j] === teachers[i]){
        //                $scope.editSelectedClass.teachers.splice(j,1);
        //            }
        //        }
        //    }
        //};

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

    .controller('AddPeriodCtrl', function ($scope, $http, $route) {

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

    .controller('AddUserCtrl', function ($scope, $http, $route) {
        var randomNumber = 0;

        var getRandomNumber = function(){
            randomNumber = Math.floor((Math.random()*899)+100);
        };
        getRandomNumber();

        $scope.roles = ['Admin','Teacher','Student'];
        $scope.roleName = $scope.roles[0];

        $scope.addNewUser = function () {
            $scope.newUser = {
                _id: $scope.roleName.toLowerCase().substr(0,[3]) + randomNumber + "-" +
                $scope.fName.toLowerCase().substr(0,[3]) + $scope.lName.toLowerCase().substr(0,[3]),
                fName:$scope.fName,
                lName:$scope.lName,
                address:$scope.address,
                city:$scope.city,
                zip:$scope.zip,
                phone:$scope.phone,
                email:$scope.email,
                role:$scope.roleName.toLowerCase(),
                dailyPoints:0
            }

            $http
                .post('adminApi/addUser', $scope.newUser)
                .success(function () {
                    $scope.userId = $scope.newUser._id;
                    $scope.error = null;
                    $route.reload();
                }).
                error(function (data, status) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };




        //$scope.output =
        //    //$scope.newUser.role.roleName.toLowerCase().substr(0,[3]) +
        //    //'-' +
        //    //$scope.newUser.fName.toLowerCase().substr(0,[3]) +
        //    $scope.newUser.lName.substr(0,[3]) +
        //    //$scope.newUser ? ($scope.newUser.lName ?  $scope.newUser.lName : '') : '' +
        //    "testing";






    })
;