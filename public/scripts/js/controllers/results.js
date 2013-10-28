(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', '$http', function($scope, $http) {
      var url;
      url = 'http://localhost:9000';
      $scope.active = 0;
      user.results = [];
      $http.get(url + '/results').success(function(data) {
        return $scope.results = data;
      });
      return $scope.checkRadio = function(answer) {
        $scope.validAnswer = true;
        return $scope.answer = answer;
      };
    }
  ]);

}).call(this);
