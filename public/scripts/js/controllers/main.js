(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', 'quizMaterial', '$location', 'user', function($scope, quizMaterial, $location, user) {
      var quizTaker;
      quizTaker = {};
      quizTaker.id = user.id;
      quizTaker.results = [];
      $scope.active = 0;
      quizMaterial.getQuestions().then(function(questions) {
        return $scope.questions = questions;
      });
      $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        return $scope.answer = answer;
      };
      $scope.submitAnswer = function() {
        quizTaker.results.push({
          answer: $scope.answer,
          question: $scope.questions[$scope.active]._id
        });
        if ($scope.active < $scope.questions.length - 1) {
          return $scope.active++;
        } else {
          quizMaterial.postAnswers(quizTaker.results);
          return $location.path('/results');
        }
      };
      return $scope.makeArray = function(size) {
        return new Array(parseInt(size));
      };
    }
  ]);

}).call(this);
