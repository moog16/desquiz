'use strict'

angular.module('deskQuizApp.main.controller', [])
  .controller 'MainCtrl', ['$scope', 'server', '$location', 'user', ($scope, server, $location, user) ->
    quizTaker = {}
    if user.loggedIn()
      quizTaker.id = user.loggedIn()
    else
      $location.path '/login'

    quizTaker.results = []

    $scope.active = 0

    promise = server.getQuestions()
    promise.then (questions) ->
      $scope.questions = questions

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer

    $scope.submitAnswer = ->
      quizTaker.results.push
        answer: $scope.answer
        question: $scope.questions[$scope.active]._id

      if $scope.active < $scope.questions.length-1
        $scope.active++
      else
        server.sendAnswers quizTaker.results
        $location.path '/results'

      # $http.post(url + '/submitQA', answer)
      # .success (data) ->
      #   console.log data

  ]
