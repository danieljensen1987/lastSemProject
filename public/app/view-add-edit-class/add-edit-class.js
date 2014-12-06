'use strict';

angular.module('myAppRename.viewAddEditClass', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add-edit-class', {
            templateUrl: 'app/view-add-edit-class/add-edit-class.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $filter, $http) {
        getView();
        function getView(){
            $http({
                method: 'GET',
                url: 'adminApi/getSemesters/'
            })
                .success(function (data) {
                    $scope.semesters = data;
                    $scope.classSelectedSemester = $scope.semesters[0];
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
                    $scope.classSelectedClass = $scope.classes[0];
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
                    $scope.classSelectedStudent = $scope.students[0];
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
                    $scope.classSelectedTeacher = $scope.teachers[0];
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

        $scope.classTeachers = [];
        $scope.classStudents = [];

        $scope.addStudent = function (id) {
            var exists = true;
            if ($scope.classStudents.length === 0){
                $scope.classStudents.push(id);
            } else{
                for(var i=0;i<$scope.classStudents.length;i++){
                    if ($scope.classStudents[i] == id){
                        exists = false;
                    }
                }
                if(exists === true){
                    $scope.classStudents.push(id);
                }
            }
        }
        $scope.addTeacher = function (id) {
            var exists = true;
            if ($scope.classTeachers.length === 0){
                $scope.classTeachers.push(id);
            } else{
                for(var i=0;i<$scope.classTeachers.length;i++){
                    if ($scope.classTeachers[i] == id){
                        exists = false;
                    }
                }
                if(exists === true){
                    $scope.classTeachers.push(id);
                }
            }
        }

        $scope.addNewClass = function (){
            var newClass = {
                "_id":$scope.classId,
                "students":$scope.classStudents,
                "teachers":$scope.classTeachers,
                semester:$scope.classSelectedSemester._id
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
        }



    })
;