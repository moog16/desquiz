'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$http', ($http) ->
    logout : () ->
      url = 'http://localhost:9000'
      $http.get(url+'/logout')
      .success (data, status, headers, config) ->
        console.log data
      .error (err, status, headers, config) ->
        console.log err
  ]
