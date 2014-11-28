'use strict';

/* Filters */

angular.module('myAppRename.filters', [])
    .filter('checkmark', function () {
      return function(input) {
        return input ? '\u2713' : '\u2718';
      };
    })
    .filter('unique', function() {
      return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
          if(typeof unique[input[i][key]] == "undefined"){
            unique[input[i][key]] = "";
            uniqueList.push(input[i]);
          }
        }
        return uniqueList;
      };
    });
