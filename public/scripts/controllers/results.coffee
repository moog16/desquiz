'use strict'

angular.module('deskQuizApp.results.controller', [])
  .controller 'ResultsCtrl', ['$scope', '$http', ($scope, $http) ->
    url = 'http://localhost:9000'
    $scope.active = 0
    user.results = []

    $http.get(url + '/results')
    .success (data) ->
      $scope.results = data

    $scope.checkRadio = (answer) ->
      $scope.validAnswer = true
      $scope.answer = answer


  ]
