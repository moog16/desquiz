'use strict'

angular.module('deskQuizApp')
  .controller 'LoginCtrl', ['$scope', '$http', ($scope, $http) ->
    $scope.login = ->
      $http({
        method : 'POST',
        url : 'localhost:5000/',
        data : $scope.user
        headers : 
          'Content-Type' : 'application/json'
      })
      .success (data, status, headers, config) ->
        console.log data
      .error (error, status, headers, config) ->
        console.log error, status
]
