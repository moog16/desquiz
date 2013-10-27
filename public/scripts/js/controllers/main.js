(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', '$http', function($scope, $http) {
      return $http.get('http://localhost:9000/quiz').success(function(data) {
        return $scope.questions = data;
      });
    }
  ]);

}).call(this);
