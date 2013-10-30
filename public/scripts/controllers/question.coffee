'use strict'

angular.module('deskQuizApp.question.controller', [])
  .controller 'QuestionCtrl', ['$scope', 'quizMaterial', '$location', 'user', ($scope, quizMaterial, $location, user) ->

    quizTaker = {}
    quizTaker.id = user.id
    quizTaker.results = []

    $scope.active = 0

    user.info()
    .then (userData) ->
      $scope.answered = (if userData.quizResults.length > 0 then true else false)
      console.log $scope.answered

    quizMaterial.getQuestions()
    .then (questions) ->
      $scope.questions = questions

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer

    $scope.makeArray = (size) ->
      if $scope.questions
        type = $scope.questions[$scope.active].type
        if type is 'fillin' then new Array parseInt(size)

    nextQuestion = ->
      if $scope.validAnswer
        if $scope.active < $scope.questions.length-1
          $scope.active++
          $scope.validAnswer = !$scope.validAnswer
        else
          quizMaterial.postAnswers quizTaker
          $location.path '/results'

    $scope.submitAnswer = ->
      quizTaker.results.push
        answer: $scope.answer
        question: $scope.questions[$scope.active]._id
      nextQuestion()


    $scope.submitFillin = () ->
      $scope.validAnswer = true
      answerArr = []
      answers = document.getElementsByClassName 'oneLine'
      answerArr.push answer.value for answer in answers 
      quizTaker.results.push
        answer: answerArr
        question: $scope.questions[$scope.active]._id
      nextQuestion()

    $scope.logout = () ->
      user.logout()

    $scope.gotoResults = () ->
      console.log 'results'
      $location.path '/results'

  ]
