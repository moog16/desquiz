(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', 'server', '$location', 'user', function($scope, server, $location, user) {
      var promise, quizTaker;
      quizTaker = {};
      if (user.loggedIn()) {
        quizTaker.id = user.loggedIn();
      } else {
        $location.path('/login');
      }
      quizTaker.results = [];
      $scope.active = 0;
      promise = server.getQuestions();
      promise.then(function(questions) {
        return $scope.questions = questions;
      });
      $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        return $scope.answer = answer;
      };
      return $scope.submitAnswer = function() {
        quizTaker.results.push({
          answer: $scope.answer,
          question: $scope.questions[$scope.active]._id
        });
        if ($scope.active < $scope.questions.length - 1) {
          return $scope.active++;
        } else {
          server.sendAnswers(quizTaker.results);
          return $location.path('/results');
        }
      };
    }
  ]);

}).call(this);
