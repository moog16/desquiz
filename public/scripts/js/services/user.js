(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$cookies', '$location', function($cookies, $location) {
      var loggedIn;
      loggedIn = function() {
        if ($scookies.userCookie) {
          return $location.path('/');
        } else {
          return $location.path('/login');
        }
      };
      return {
        loggedIn: loggedIn
      };
    }
  ]);

}).call(this);
