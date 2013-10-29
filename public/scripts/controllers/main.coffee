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
      # $scope.renderQuestion = (questions[0].question).replace('\n', '<br>\n')

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer

    $scope.makeArray = (size) ->
      if typeof size is 'string' then new Array parseInt(size)

    nextQuestion = ->
      if $scope.validAnswer
        if $scope.active < $scope.questions.length-1
          $scope.active++
          # $scope.renderQuestion = $scope.questions[$scope.active].question.replace('\n', '<p>')
          $scope.validAnswer = !$scope.validAnswer
        else
          quizMaterial.postAnswers quizTaker.results
          $location.path '/results'

    $scope.submitAnswer = ->
      quizTaker.results.push
        answer: $scope.answer
        question: $scope.questions[$scope.active]._id
      nextQuestion()


    $scope.submitFillin = () ->
      answerArr = []
      answers = document.getElementsByClassName 'oneLine'
      answerArr.push answer.value for answer in answers 
      quizTaker.results.push
        answer: answerArr
        question: $scope.questions[$scope.active]._id
      nextQuestion()


  ]
