(function() {
  'use strict';
  var deskQuizApp;

  deskQuizApp = angular.module('deskQuizApp', ['deskQuizApp.main.controller', 'deskQuizApp.results.controller', 'deskQuizApp.quizMaterial.service', 'deskQuizApp.user.service', 'ngCookies']);

  deskQuizApp.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/results', {
      templateUrl: 'views/results.html',
      controller: 'ResultsCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
