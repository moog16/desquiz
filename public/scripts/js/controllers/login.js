(function() {
  'use strict';
  angular.module('deskQuizApp.login.controller', []).controller('LoginCtrl', [
    '$scope', '$cookies', function($scope, $cookies) {
      if ($cookies.userCookie) {
        $location.path('/');
      }
      return $scope.login = function() {};
    }
  ]);

}).call(this);
