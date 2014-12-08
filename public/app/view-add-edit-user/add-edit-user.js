'use strict';

angular.module('myAppRename.viewAddEditUser', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view-add-edit-user', {
            templateUrl: 'app/view-add-edit-user/add-edit-user.html',
            controller: 'View7Ctrl'
        });
    }])

    .controller('View7Ctrl', function ($scope, $http) {
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
                dailyPoints:0
            }

            $http
                .post('adminApi/addStudent', $scope.newUser)
                .success(function () {
                    $scope.userId = $scope.newUser._id;
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




        //$scope.output =
        //    //$scope.newUser.role.roleName.toLowerCase().substr(0,[3]) +
        //    //'-' +
        //    //$scope.newUser.fName.toLowerCase().substr(0,[3]) +
        //    $scope.newUser.lName.substr(0,[3]) +
        //    //$scope.newUser ? ($scope.newUser.lName ?  $scope.newUser.lName : '') : '' +
        //    "testing";






    })
;