'use strict'

angular.module('deskQuizApp.results.controller', [])
  .controller 'ResultsCtrl', ['$scope', 'quizMaterial', ($scope, quizMaterial) ->
    quizMaterial.getResults()
    .then (results) ->
      $scope.results = results

    $scope.questions = quizMaterial.getQuestions()

  ]
