'use strict';

angular.module('myAppRename.viewAddEditClass', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add-edit-class', {
            templateUrl: 'app/view-add-edit-class/add-edit-class.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http) {
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

        $scope.addStudentToClass = function (students) {
            for(var i in students){
                var exists = false;
                for(var j in $scope.editSelectedClass.students){
                    if($scope.editSelectedClass.students[j] === students[i]._id){
                        exists = true;
                    }
                }
                if (exists === false){
                    $scope.editSelectedClass.students.push(students[i]._id);
                }
            }

        };
        $scope.removeStudentFromClass = function (students){
            for(var i in students){
                for(var j in $scope.editSelectedClass.students){
                    if($scope.editSelectedClass.students[j] === students[i]){
                        $scope.editSelectedClass.students.splice(j,1);
                    }
                }
            }
        };
        $scope.addTeacherToClass = function (teachers) {
            for(var i in teachers){
                var exists = false;
                for(var j in $scope.editSelectedClass.teachers){
                    if($scope.editSelectedClass.teachers[j] === teachers[i]._id){
                        exists = true;
                    }
                }
                if (exists === false){
                    $scope.editSelectedClass.teachers.push(teachers[i]._id);
                }
            }

        };
        $scope.removeTeacherFromClass = function (teachers){
            for(var i in teachers){
                for(var j in $scope.editSelectedClass.teachers){
                    if($scope.editSelectedClass.teachers[j] === teachers[i]){
                        $scope.editSelectedClass.teachers.splice(j,1);
                    }
                }
            }
        };

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
        $scope.updateClass = function (){
            var updateClass = {
                "_id":$scope.editSelectedClass._id,
                "students":$scope.editSelectedClass.students,
                "teachers":$scope.editSelectedClass.teachers,
                semester: $scope.editSelectedClass.semester
            };

            $http
                .post('adminApi/updateClass', updateClass)
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