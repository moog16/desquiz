'use strict'

angular.module('deskQuizApp.server.service', [])
  .factory 'server', ['$http', '$q', ($http, $q) ->
    url = 'http://localhost:9000'

    getReq = (resource) ->
      deferred = $q.defer()
      $http.get(url + resource)
      .success (data, status, headers, config) ->
        deferred.resolve data
      .error (err, status, headers, config) ->
        console.log err

      deferred.promise

    sendAnswers = () ->
      $http.post(url + '/results')
      .success (data, status, headers, config) ->
        console.log data
      .error (err, status, headers, config) ->
        console.log err

    getQuestions = () ->
      getReq '/quiz'
    
    getResults = () ->
      getReq '/results'

    sendAnswers: sendAnswers
    getQuestions: getQuestions
    getResults: getResults
  ]
