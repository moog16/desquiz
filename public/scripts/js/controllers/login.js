(function() {
  'use strict';
  angular.module('deskQuizApp.login.controller', []).controller('LoginCtrl', [
    '$scope', 'user', '$location', function($scope, user, $location) {
      if (user.loggedIn()) {
        $location.path('/');
      }
      return $scope.login = function() {
        var newQuizTaker;
        newQuizTaker = {
          username: $scope.quizTaker.email,
          pass: $scope.quizTaker.pwd
        };
        return user.setLogin(newQuizTaker);
      };
    }
  ]);

}).call(this);
