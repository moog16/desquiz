(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', 'quizMaterial', '$location', 'user', function($scope, quizMaterial, $location, user) {
      var nextQuestion, quizTaker;
      quizTaker = {};
      quizTaker.id = user.id;
      quizTaker.results = [];
      $scope.active = 0;
      quizMaterial.getQuestions().then(function(questions) {
        $scope.questions = questions;
        return $scope.renderQuestion = questions[0].question.replace('\n', '<br>\n');
      });
      $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        return $scope.answer = answer;
      };
      $scope.makeArray = function(size) {
        if (size) {
          return new Array(parseInt(size));
        }
      };
      nextQuestion = function() {
        if ($scope.active < $scope.questions.length - 1) {
          $scope.active++;
          return $scope.renderQuestion = $scope.questions[$scope.active].question.replace('\n', '<br>\n');
        } else {
          quizMaterial.postAnswers(quizTaker.results);
          return $location.path('/results');
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
