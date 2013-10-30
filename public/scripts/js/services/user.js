(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$http', '$q', function($http, $q) {
      var url;
      url = 'http://localhost:9000';
      return {
        logout: function() {
          return $http.get(url + '/logout').success(function(data, status, headers, config) {
            console.log(data);
            return window.location.reload();
          }).error(function(err, status, headers, config) {
            return console.log(err);
          });
        },
        info: function() {
          var deferred;
          deferred = $q.defer();
          $http.get(url + '/user').success(function(data, status, headers, config) {
            return deferred.resolve(data);
          }).error(function(err, status, headers, config) {
            return deferred.reject(err);
          });
          return deferred.promise;
        }
      };
    }
  ]);

}).call(this);
