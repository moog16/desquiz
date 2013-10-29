'use strict'

deskQuizApp = angular.module 'deskQuizApp', [
  'deskQuizApp.question.controller'
  'deskQuizApp.results.controller'
  'deskQuizApp.quizMaterial.service'
  'deskQuizApp.user.service'
  'ngCookies'
]

deskQuizApp.config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/question.html'
        controller: 'QuestionCtrl'
      .when '/results',
        templateUrl: 'views/results.html'
        controller: 'ResultsCtrl'
      .otherwise
        redirectTo: '/'