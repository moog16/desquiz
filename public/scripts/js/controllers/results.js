(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'quizMaterial', function($scope, quizMaterial) {
      var questionAnswerMap;
      $scope.correct = 0;
      quizMaterial.getResults().then(function(results) {
        return quizMaterial.getQuestions().then(function(questions) {
          $scope.results = questionAnswerMap(results, questions);
          return $scope.score = (($scope.correct / questions.length) * 100).toFixed(1);
        });
      });
      return questionAnswerMap = function(results, questions) {
        var newResults, result, _fn, _i, _len;
        newResults = [];
        _fn = function(result) {
          var found, index, questionId, _results;
          questionId = result.question;
          found = false;
          index = 0;
          _results = [];
          while (!found || index === questions.length - 1) {
            _results.push((function() {
              var correct, correctAnswer, correctAnswerInd, question;
              question = questions[index];
              if (questionId === question._id) {
                correctAnswerInd = question.correctAnswer;
                correctAnswer = question.answers[correctAnswerInd];
                correct = false;
                if (result.answer === correctAnswer) {
                  $scope.correct++;
                  correct = true;
                }
                newResults.push({
                  answer: result.answer,
                  question: question.question,
                  correctAnswer: correctAnswer,
                  correct: correct
                });
                index = 0;
                found = true;
              }
              return index++;
            })());
          }
          return _results;
        };
        for (_i = 0, _len = results.length; _i < _len; _i++) {
          result = results[_i];
          _fn(result);
        }
        return newResults;
      };
    }
  ]);

}).call(this);
