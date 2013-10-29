(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$cookies', '$http', '$location', '$q', function($cookies, $http, $location, $q) {
      var loggedIn, setLogin, userId;
      userId = $cookies.userCookie;
      loggedIn = function() {
        console.log($cookies.userCookie, 'logged in?');
        if (userId) {
          return true;
        } else {
          return false;
        }
      };
      setLogin = function(loginCred) {
        var deferred;
        deferred = $q.defer();
        $http.post('/user', loginCred).success(function(newUserId, status, headers, config) {
          userId = $cookies.userCookie = newUserId;
          return deferred.resolve(newUserId);
        }).error(function(err, status, headers, config) {
          console.log(err);
          return deferred.reject(err);
        });
        return deferred.promise;
      };
      return {
        loggedIn: loggedIn,
        setLogin: setLogin,
        id: userId
      };
    }
  ]);

}).call(this);
