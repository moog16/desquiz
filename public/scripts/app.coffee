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
      .otherwise
        redirectTo: '/'
  # .config ($httpProvider) -> 
  #   $httpProvider.defaults.useXDomain = true
  #   delete $httpProvider.defaults.headers.common['X-Requested-With']
