'use strict'

angular.module('deskQuizApp', [])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/login.html'
        controller: 'LoginCtrl'
      .otherwise
        redirectTo: '/'
  .config ($httpProvider) -> 
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']
