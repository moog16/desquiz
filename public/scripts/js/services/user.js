(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$http', '$location', function($http, $location) {
      return {
        logout: function() {
          var url;
          url = 'http://localhost:9000';
          return $http.post(url + '/logout').success(function(data, status, headers, config) {
            console.log(data);
            return $location.path('/');
          }).error(function(err, status, headers, config) {
            return console.log(err);
          });
        }
      };
    }
  ]);

}).call(this);
