'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$http', ($cookies, $http) ->

    loggedIn = () ->
      if $cookies.userCookie
        $cookies.userCookie
      else
        false

    setLogin = (loginCred) ->
      console.log loginCred

    loggedIn: loggedIn
    setLogin: setLogin
  ]
