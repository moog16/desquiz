'use strict'

angular.module('deskQuizApp.login.controller', [])
  .controller 'LoginCtrl', ['$scope', 'user', '$location', ($scope, user, $location) ->
    if user.loggedIn()
      $location.path '/'

    $scope.login = ->
      newQuizTaker = 
      username: $scope.quizTaker.email
      pass: $scope.quizTaker.pwd

      user.setLogin newQuizTaker
  ]
