'use strict'

angular.module('deskQuizApp.main.controller', [])
  .controller 'MainCtrl', ['$scope', '$http', ($scope, $http) ->
    $http.get('http://localhost:9000/quiz')
    .success (data) ->
      $scope.questions = data


  ]
