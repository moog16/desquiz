(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'quizMaterial', function($scope, quizMaterial) {
      return quizMaterial.getResults;
    }
  ]);

}).call(this);
