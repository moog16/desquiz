'use strict'

angular.module('deskQuizApp.main.controller', [])
  .controller 'MainCtrl', ['$scope', '$http', ($scope, $http) ->
    url = 'http://localhost:9000'
    $scope.active = 0

    $http.get(url + '/quiz')
    .success (data) ->
      $scope.questions = data

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer
      console.log(answer);

    $scope.submitAnswer = ->
      answer =
      answer : $scope.answer
      question: $scope.questions[$scope.active]._id
      if $scope.active <= $scope.questions.length
        $scope.active++
      # $http.post(url + '/submitQA', answer)
      # .success (data) ->
      #   console.log data

  ]
