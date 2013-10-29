(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', 'quizMaterial', '$location', 'user', '$cookies', function($scope, quizMaterial, $location, user, $cookies) {
      var nextQuestion, quizTaker;
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
      $scope.makeArray = function(size) {
        var type;
        if ($scope.questions) {
          type = $scope.questions[$scope.active].type;
          if (type === 'fillin') {
            return new Array(parseInt(size));
          }
        }
      };
      nextQuestion = function() {
        if ($scope.validAnswer) {
          if ($scope.active < $scope.questions.length - 1) {
            $scope.active++;
            return $scope.validAnswer = !$scope.validAnswer;
          } else {
            return quizMaterial.postAnswers(quizTaker);
          }
        }
      };
      $scope.submitAnswer = function() {
        quizTaker.results.push({
          answer: $scope.answer,
          question: $scope.questions[$scope.active]._id
        });
        return nextQuestion();
      };
      return $scope.submitFillin = function() {
        var answer, answerArr, answers, _i, _len;
        $scope.validAnswer = true;
        answerArr = [];
        answers = document.getElementsByClassName('oneLine');
        for (_i = 0, _len = answers.length; _i < _len; _i++) {
          answer = answers[_i];
          answerArr.push(answer.value);
        }
        quizTaker.results.push({
          answer: answerArr,
          question: $scope.questions[$scope.active]._id
        });
        return nextQuestion();
      };
    }
  ]);

}).call(this);
