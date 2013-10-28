'use strict'

angular.module('deskQuizApp.login.controller', [])
  .controller 'LoginCtrl', ['$scope', '$cookies', ($scope, $cookies) ->

    if $cookies.userCookie
      $location.path('/');

    $scope.login = ->
      
  ]
