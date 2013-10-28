(function() {
  'use strict';
  var deskQuizApp;

  deskQuizApp = angular.module('deskQuizApp', ['deskQuizApp.main.controller', 'deskQuizApp.login.controller']);

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
