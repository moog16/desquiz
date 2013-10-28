'use strict'

angular.module('deskQuizApp.main.controller', [])
  .controller 'MainCtrl', ['$scope', 'server', '$location', ($scope, server, $location) ->

    $scope.active = 0
    user = {}
    user.results = []

    promise = server.getQuestions()
    promise.then (questions) ->
      $scope.questions = questions

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer

    $scope.submitAnswer = ->
      user.results.push
        answer: $scope.answer
        question: $scope.questions[$scope.active]._id

      if $scope.active < $scope.questions.length-1
        $scope.active++
      else
        server.sendAnswers user.results
        $location.path '/results'

      # $http.post(url + '/submitQA', answer)
      # .success (data) ->
      #   console.log data

  ]
