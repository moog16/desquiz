'use strict'

angular.module('deskQuizApp.quizMaterial.service', [])
  .factory 'quizMaterial', ['$http', '$q', ($http, $q) ->
    url = 'http://localhost:9000'

    getReq = (resource) ->
      deferred = $q.defer()
      $http.get(url + resource)
      .success (data, status, headers, config) ->
        console.log data
        deferred.resolve data
      .error (err, status, headers, config) ->
        console.log err
        deferred.reject err

      deferred.promise

    postAnswers = (quizTakerResults) ->
      $http.post(url + '/results', quizTakerResults)
      .success (data, status, headers, config) ->
        console.log data
      .error (err, status, headers, config) ->
        console.log err, 'error'

    getQuestions = () ->
      getReq '/quiz'
    
    getResults = () ->
      getReq '/results'

    postAnswers: postAnswers
    getQuestions: getQuestions
    getResults: getResults
  ]
