'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$http', ($cookies, $http) ->

    loggedIn = () ->
      if $cookies.userCookie
        $cookies.userCookie
      else
        false

    setLogin = (loginCred) ->
      $http.post('/user', loginCred)
      .success (newUser, status, headers, config) ->
        # $cookies.userCookie = newUser._id
      .error (err, status, headers, config) ->
        console.log err

    loggedIn: loggedIn
    setLogin: setLogin
  ]
