(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', '$http', function($scope, $http) {
      var url;
      url = 'http://localhost:9000';
      $scope.active = 0;
      $http.get(url + '/quiz').success(function(data) {
        return $scope.questions = data;
      });
      $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        $scope.answer = answer;
        return console.log(answer);
      };
      return $scope.submitAnswer = function() {
        var answer;
        answer = {
          answer: $scope.answer,
          question: $scope.questions[$scope.active]._id
        };
        if ($scope.active <= $scope.questions.length) {
          return $scope.active++;
        }
      };
    }
  ]);

}).call(this);
