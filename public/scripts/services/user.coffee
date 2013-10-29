'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$http', '$location', '$timeout', ($cookies, $http, $location, $timeout) ->

    loggedIn = () ->
      console.log $cookies.userCookie, 'logged in?'
      if $cookies.userCookie
        $cookies.userCookie
      else
        false

    setLogin = (loginCred) ->
      $http.post('/user', loginCred)
      .success (newUserId, status, headers, config) ->
        $cookies.userCookie = newUserId
        $location.path '/'
      .error (err, status, headers, config) ->
        console.log err

    loggedIn: loggedIn
    setLogin: setLogin
  ]
