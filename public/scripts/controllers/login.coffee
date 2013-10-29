'use strict'

angular.module('deskQuizApp.login.controller', [])
  .controller 'LoginCtrl', ['$scope', 'user', '$location', ($scope, user, $location) ->
    $scope.login = ->
      newQuizTaker = 
      username: $scope.quizTaker.email
      pass: $scope.quizTaker.pwd

      user.setLogin(newQuizTaker)
      .then () ->
        $location.path '/'
  ]
