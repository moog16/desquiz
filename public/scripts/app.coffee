'use strict'
deskQuizApp = angular.module 'deskQuizApp', [
  'deskQuizApp.main.controller'
  'deskQuizApp.login.controller'
]

deskQuizApp.config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/results',
        templateUrl: 'views/results.html'
        controller: 'ResultsCtrl'
      .otherwise
        redirectTo: '/'