(function() {
  'use strict';
  angular.module('deskQuizApp', []).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }).config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    return delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

}).call(this);
