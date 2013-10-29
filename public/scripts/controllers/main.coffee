'use strict'

angular.module('deskQuizApp.main.controller', [])
  .controller 'MainCtrl', ['$scope', 'quizMaterial', '$location', 'user', ($scope, quizMaterial, $location, user) ->
    quizTaker = {}
    # if !user.loggedIn()
    #   console.log('yolo')
    #   $location.path '/login'

    quizTaker.id = user.id
    quizTaker.results = []

    $scope.active = 0

    quizMaterial.getQuestions()
    .then (questions) ->
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
        quizMaterial.postAnswers quizTaker.results
        $location.path '/results'

    $scope.makeArray = (size) ->
      new Array parseInt(size)

  ]
