'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$http', '$location', '$q', ($cookies, $http, $location, $q) ->

    userId = $cookies.userCookie

    loggedIn = () ->
      console.log $cookies.userCookie, 'logged in?'
      if userId then true else false

    setLogin = (loginCred) ->
      deferred = $q.defer()
      $http.post('/user', loginCred)
      .success (newUserId, status, headers, config) ->
        userId = $cookies.userCookie = newUserId
        deferred.resolve(newUserId)
      .error (err, status, headers, config) ->
        console.log err
        deferred.reject(err)
      deferred.promise

    loggedIn: loggedIn
    setLogin: setLogin
    id: userId
  ]
