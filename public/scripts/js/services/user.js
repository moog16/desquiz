(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$cookies', '$location', function($cookies, $location) {
      var loggedIn, setLogin;
      loggedIn = function() {
        if ($cookies.userCookie) {
          return $cookies.userCookie;
        } else {
          return false;
        }
      };
      setLogin = function() {};
      return {
        loggedIn: loggedIn
      };
    }
  ]);

}).call(this);
