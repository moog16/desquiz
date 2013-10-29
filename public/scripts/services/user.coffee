'use strict'

angular.module('deskQuizApp.user.service', [])
  .factory 'user', ['$cookies', '$location', ($cookies, $location) ->

    loggedIn = () ->
      if $scookies.userCookie
        $location.path '/'
      else
        $location.path '/login'

    loggedIn: loggedIn
  ]
