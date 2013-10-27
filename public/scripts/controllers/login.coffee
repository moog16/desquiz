'use strict'

angular.module('deskQuizApp')
  .controller 'LoginCtrl', ['$scope', '$http', ($scope, $http) ->
    $scope.login = ->
      options = 
        headers : 
          'Content-Type' : 'application/json'

      $http.post('http://localhost:5000/login', $scope.user, options)
      .success (data, status, headers, config) ->
        console.log data
      .error (error, status, headers, config) ->
        console.log error, status
]
