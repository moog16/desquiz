(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$cookies', '$http', '$location', '$timeout', function($cookies, $http, $location, $timeout) {
      var loggedIn, setLogin;
      loggedIn = function() {
        console.log($cookies.userCookie, 'logged in?');
        if ($cookies.userCookie) {
          return $cookies.userCookie;
        } else {
          return false;
        }
      };
      setLogin = function(loginCred) {
        return $http.post('/user', loginCred).success(function(newUserId, status, headers, config) {
          $cookies.userCookie = newUserId;
          return $location.path('/');
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
