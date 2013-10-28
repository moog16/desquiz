'use strict'

angular.module('deskQuizApp.server.service', [])
  .factory 'server', ['$http', '$q', ($http, $q) ->
    url = 'http://localhost:9000'

    sendAnswers = () ->
      $http.post(url + '/quiz')
      .success (res) ->
        console.log res
      .error (error) ->
        console.log error

    getQuestions = () ->
      deferred = $q.defer()
      $http.get(url + '/quiz')
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (err, status, headers, config) ->
        console.log err

      deferred.promise;

    return
      sendAnswers: sendAnswers
      getQuestions: getQuestions
  ]
