(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'quizMaterial', function($scope, quizMaterial) {
      return quizMaterial.getResults().then(function(results) {
        return $scope.results = results;
      });
    }
  ]);

}).call(this);
