(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', '$http', '$location', function($scope, $http, $location) {
      var url, user;
      url = 'http://localhost:9000';
      $scope.active = 0;
      user = {};
      user.results = [];
      $http.get(url + '/quiz').success(function(data) {
        return $scope.questions = data;
      });
      $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        return $scope.answer = answer;
      };
      return $scope.submitAnswer = function() {
        user.results.push({
          answer: $scope.answer,
          question: $scope.questions[$scope.active]._id
        });
        if ($scope.active < $scope.questions.length - 1) {
          return $scope.active++;
        } else {
          server.sendAnswers(user.results);
          return $location.path('/results');
        }
      };
    }
  ]);

}).call(this);
