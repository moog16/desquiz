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
        return $http.post('/user', loginCred).success(function(newUser, status, headers, config) {
          return console.log(newUser);
        }).error(function(err, status, headers, config) {
          return console.log(err);
        });
      };
      return {
        loggedIn: loggedIn,
        setLogin: setLogin
      };
    }
  ]);

}).call(this);
