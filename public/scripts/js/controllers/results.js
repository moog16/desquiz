(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'quizMaterial', 'user', function($scope, quizMaterial, user) {
      var checkFillin, questionAnswerMap;
      $scope.correct = 0;
      quizMaterial.getResults().then(function(results) {
        return quizMaterial.getQuestions().then(function(questions) {
          $scope.results = questionAnswerMap(results, questions);
          return $scope.score = (($scope.correct / questions.length) * 100).toFixed(1);
        });
      });
      $scope.logout = function() {
        return user.logout();
      };
      checkFillin = function(result, questions) {
        var answers, match, _fn, _i, _len, _ref;
        answers = JSON.parse(questions.correctAnswer);
        match = true;
        _ref = result.answer;
        _fn = function() {
          var answer, _j, _len1, _results;
          if (!match) {
            return false;
          }
          match = false;
          _results = [];
          for (_j = 0, _len1 = answers.length; _j < _len1; _j++) {
            answer = answers[_j];
            _results.push((function() {
              if (result === answer) {
                return match = true;
              }
            })());
          }
          return _results;
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          result = _ref[_i];
          _fn();
        }
        return match;
      };
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
              var correct, correctAnswer, correctAnswerInd, func, question;
              question = questions[index];
              if (questionId === question._id) {
                correctAnswerInd = question.correctAnswer;
                correctAnswer = question.answers[correctAnswerInd];
                correct = false;
                func = false;
                if (question.type === 'fillin') {
                  correct = checkFillin(result, question);
                  correctAnswer = JSON.parse(question.correctAnswer);
                }
                if (result.answer === correctAnswer || correct) {
                  $scope.correct++;
                  correct = true;
                }
                if (question.func) {
                  func = true;
                }
                newResults.push({
                  answer: result.answer,
                  question: question.question,
                  correctAnswer: correctAnswer,
                  correct: correct,
                  func: func
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
