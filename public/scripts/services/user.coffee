'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$location', ($cookies, $location) ->

    loggedIn = () ->
      if $cookies.userCookie
        $cookies.userCookie
      else
        false

    setLogin = () ->


    loggedIn: loggedIn
  ]
