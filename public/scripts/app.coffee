'use strict'

deskQuizApp = angular.module 'deskQuizApp', [
  'deskQuizApp.main.controller'
  'deskQuizApp.results.controller'
  'deskQuizApp.login.controller'
  'deskQuizApp.server.service'
  'deskQuizApp.user.service'
  'ngCookies'
]

deskQuizApp.config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/login',
        templateUrl: 'views/login.html'
        controller: 'LoginCtrl'
      .when '/results',
        templateUrl: 'views/results.html'
        controller: 'ResultsCtrl'
      .otherwise
        redirectTo: '/login'