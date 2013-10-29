'use strict'

angular.module('deskQuizApp.login.controller', [])
  .controller 'LoginCtrl', ['$scope', 'user', ($scope, user) ->
    if user.loggedIn()
      $location.path '/'

    $scope.login = ->
      newQuizTaker = 
      username: $scope.quizTaker.email
      pass: $scope.quizTaker.pwd

      user.setLogin newQuizTaker
  ]
