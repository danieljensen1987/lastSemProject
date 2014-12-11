'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
  'ngRoute',
  'myAppRename.controllers',
  'myAppRename.directives',
  'myAppRename.services',
  'myAppRename.factories',
  'myAppRename.filters',
  'myAppRename.viewAll',
  'myAppRename.viewStudent',
  'myAppRename.viewTeacher',
  'myAppRename.viewAdd',
  'myAppRename.viewEdit'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view-all'});
}])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });



