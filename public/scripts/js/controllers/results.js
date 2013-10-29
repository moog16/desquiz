(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'quizMaterial', function($scope, quizMaterial) {
      quizMaterial.getResults().then(function(results) {
        return $scope.results = results;
      });
      return $scope.questions = quizMaterial.getQuestions();
    }
  ]);

}).call(this);
