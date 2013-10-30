'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$http', '$q', ($http, $q) ->
    url = 'http://localhost:9000'

    logout : () ->
      $http.get(url+'/logout')
      .success (data, status, headers, config) ->
        console.log data
        window.location.reload()
      .error (err, status, headers, config) ->
        console.log err

    info : () ->
      deferred = $q.defer()
      $http.get(url + '/user')
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (err, status, headers, config) ->
        deferred.reject err
      deferred.promise
  ]
