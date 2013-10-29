(function() {
  'use strict';
  angular.module('deskQuizApp.login.controller', []).controller('LoginCtrl', [
    '$scope', 'user', '$location', function($scope, user, $location) {
      return $scope.login = function() {
        var newQuizTaker;
        newQuizTaker = {
          username: $scope.quizTaker.email,
          pass: $scope.quizTaker.pwd
        };
        return user.setLogin(newQuizTaker).then(function() {
          return $location.path('/');
        });
      };
    }
  ]);

}).call(this);
