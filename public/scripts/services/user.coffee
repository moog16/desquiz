'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$http', '$location', ($http, $location) ->
    logout : () ->
      url = 'http://localhost:9000'
      $http.post(url+'/logout')
      .success (data, status, headers, config) ->
        console.log data
        $location.path '/'
      .error (err, status, headers, config) ->
        console.log err
  ]
