(function() {
  'use strict';
  angular.module('deskQuizApp').controller('LoginCtrl', [
    '$scope', '$http', function($scope, $http) {
      return $scope.login = function() {
        var options;
        options = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return $http.post('http://localhost:5000/login', $scope.user, options).success(function(data, status, headers, config) {
          return console.log(data);
        }).error(function(error, status, headers, config) {
          return console.log(error, status);
        });
      };
    }
  ]);

}).call(this);
