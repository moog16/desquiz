(function() {
  'use strict';
  angular.module('deskQuizApp.login.controller', []).controller('LoginCtrl', [
    '$scope', '$http', function($scope, $http) {
      return $scope.login = function() {
        var options;
        options = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return $http.post('/login', $scope.user, options).success(function(data, status, headers, config) {
          return console.log(data);
        }).error(function(error, status, headers, config) {
          return console.log(error, status);
        });
      };
    }
  ]);

}).call(this);
