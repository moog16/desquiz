'use strict'

angular.module('deskQuizApp.quizMaterial.service', [])
  .factory 'quizMaterial', ['$http', '$q', ($http, $q) ->
    url = 'http://localhost:9000'
    savedQuestions = null

    getReq = (resource) ->
      deferred = $q.defer()
      $http.get(url + resource)
      .success (data, status, headers, config) ->
        console.log data
        if resource is '/quiz' then savedQuestions = data
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
      if !savedQuestions
        getReq '/quiz'
      else
        savedQuestions
    
    getResults = () ->
      getReq '/results'

    postAnswers: postAnswers
    getQuestions: getQuestions
    getResults: getResults
  ]
