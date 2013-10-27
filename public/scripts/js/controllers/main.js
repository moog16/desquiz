(function() {
  'use strict';
  angular.module('deskQuizApp.main.controller', []).controller('MainCtrl', [
    '$scope', '$http', function($scope, $http) {
      return $scope.quizQuestions = {
        name: 'hello'
      };
    }
  ]);

}).call(this);
