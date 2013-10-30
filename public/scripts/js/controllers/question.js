(function() {
  'use strict';
  angular.module('deskQuizApp.question.controller', []).controller('QuestionCtrl', [
    '$scope', 'quizMaterial', '$location', 'user', function($scope, quizMaterial, $location, user) {
      var nextQuestion, quizTaker;
      quizTaker = {};
      quizTaker.id = user.id;
      quizTaker.results = [];
      $scope.active = 0;
      user.info().then(function(userData) {
        $scope.answered = (userData.quizResults.length > 0 ? true : false);
        return console.log($scope.answered);
      });
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
            quizMaterial.postAnswers(quizTaker);
            return $location.path('/results');
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
      $scope.submitFillin = function() {
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
      $scope.logout = function() {
        return user.logout();
      };
      return $scope.gotoResults = function() {
        console.log('results');
        return $location.path('/results');
      };
    }
  ]);

}).call(this);
