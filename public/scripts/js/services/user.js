(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$cookies', '$http', function($cookies, $http) {
      var loggedIn, setLogin;
      loggedIn = function() {
        if ($cookies.userCookie) {
          return $cookies.userCookie;
        } else {
          return false;
        }
      };
      setLogin = function(loginCred) {
        return console.log(loginCred);
      };
      return {
        loggedIn: loggedIn,
        setLogin: setLogin
      };
    }
  ]);

}).call(this);
